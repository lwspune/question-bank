/**
 * Registry + shared helpers for ingesting a teacher-authored LWS test paper
 * (an existing printed PDF) into the system. One paper = one `PAPERS` entry +
 * one `data/<slug>.records.json` transcription. Three CLIs read this:
 *
 *   build-tags.ts <slug>          -> the nda-tracker tagged-enrichment XLSX (ALL questions, OMR Q-order)
 *   commit-paper.ts <slug> --apply -> commit rows as PRIVATE practice + create the /dashboard/papers paper
 *   flip-public.ts  <slug> --apply -> flip ONLY status:"new" rows to PUBLIC (the dedup gate)
 *
 * The whole printed test goes into the paper + the Excel (OMR parity); only the
 * NON-duplicate, non-flawed questions (status:"new") ever become PUBLIC practice,
 * so the browsable bank stays deduped while the paper stays a faithful full test.
 *
 * Records are vision-transcribed by hand (the irreducible core). This module only
 * carries the per-paper config + the pure record->row adapters used by every CLI,
 * so the three scripts share ONE code path. See .claude/commands/lws-test-ingest.md.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { contentHash } from "../../src/lib/upload/hash";
import type { ParsedRowPayload, OptionLabel, Difficulty } from "../../src/lib/upload/validate";
import type { QuestionRow, OptionRow } from "../../src/lib/questions/query";

// LWS Pune org + admin (same identities as the practice pipeline) — default NDA exam.
// Imported locally (so examIdOf can reference EXAM_ID) AND re-exported for the CLIs.
import { ORG_ID, EXAM_ID, CREATED_BY } from "../practice/config";
export { ORG_ID, EXAM_ID, CREATED_BY };

export const DATA = join(__dirname, "data"); // committed transcriptions (source of truth)
const LABELS: OptionLabel[] = ["A", "B", "C", "D"];
const DIFFICULTIES = new Set<Difficulty>(["EASY", "MODERATE", "HARD"]);

/** One transcribed MCQ from the printed paper, in PRINTED option order. */
export type PaperRec = {
  n: number; // printed question number (drives OMR Q-order)
  stem: string; // LaTeX-bearing (\(...\))
  optA: string; optB: string; optC: string; optD: string;
  answer: "A" | "B" | "C" | "D"; // key for THIS paper's option order (derived if the PDF has no key)
  solution: string;
  difficulty: Difficulty;
  subtopic: string; // one of spec.subtopics
  /** "new" = genuinely new -> PUBLIC-eligible; "dup" = already in the bank; "flawed" = bad options.
   *  dup + flawed stay PRIVATE (paper-backing only). Missing => "new". */
  status?: "new" | "dup" | "flawed";
  reviewNote?: string; // surfaced in dry-runs; for low-confidence / flawed items
  /** Multi-chapter papers (a mock spanning chapters): the canonical DB chapter for
   *  THIS question. Single-chapter papers omit it (falls back to spec.chapterName). */
  chapter?: string;
  /** Multi-subject papers (a GAT mock spanning subjects): the canonical DB subject for
   *  THIS question. Single-subject papers omit it (falls back to spec.subjectName). */
  subject?: string;
  /** Shared passage / stimulus (comprehension). Stored on questions.context; NOT in
   *  content_hash, so the stem must still be unique. Rendered once per set. */
  context?: string;
  /** Set grouping label (e.g. "RC1"). Questions sharing a setLabel form one passage
   *  set (set_id), co-located in the paper + Excel. Scoped per upload_job. */
  setLabel?: string;
};

export type PaperSpec = {
  slug: string;
  title: string; // /dashboard/papers title, as a teacher would name it
  recordsFile: string; // data/<file> (defaults to <slug>.records.json)
  outName: string; // generated-papers/<outName>.xlsx
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup/rollback key)
  subjectName?: string; // DB subject ("Mathematics", "Geography", ...). Omit in multi-subject mode.
  // Three filing modes, in order of generality:
  //   single-subject single-chapter: chapterName + subtopics (the common case)
  //   single-subject multi-chapter:  chapters (chapter -> subtopics) + per-record `chapter`
  //   multi-subject (a GAT mock):    subjects (subject -> chapter -> subtopics) + per-record `subject`+`chapter`
  // The paper still files everything under ONE `section`; only the BANK rows go to
  // their per-record subject/chapter.
  chapterName?: string; // canonical DB chapter (single-chapter mode; must already exist)
  subtopics?: string[]; // valid DB subtopics for that chapter
  chapters?: Record<string, string[]>; // multi-chapter mode: chapter -> valid subtopics
  subjects?: Record<string, Record<string, string[]>>; // multi-subject mode: subject -> chapter -> subtopics
  pyqNote: string; // questions.pyq_note
  examName: string; // display name for the QuestionRow ("NDA")
  examId?: string; // DB exam id; defaults to the NDA EXAM_ID. Set for a non-NDA exam (e.g. Foundation Course).
  section: { key: string; label: string }; // single section the paper files all questions under
  bankAdd: boolean; // commit-paper commits rows + creates the paper; if false it's Excel-only
  createPaper?: boolean; // default true; false => commit bank rows only, skip the /dashboard/papers paper
};

export const PAPERS: Record<string, PaperSpec> = {
  // LWS "CHEMICAL BONDING – 30 MCQs" — a 30-q Class-11 Chemistry worksheet, supplied as a
  // single WhatsApp photo (two printed columns, Q1–15 left / Q16–30 right). Legible enough
  // to transcribe directly from the image (upscaled column crops); NO printed key, so every
  // answer is DERIVED. Filed under MHT-CET (examId override) rather than NDA because the
  // content is squarely Class-11 HSC — Born-Haber cycle, lattice energy, VBT and
  // hybridisation — well above the basic NDA Chemistry "Chemical Bonding" chapter (13 q,
  // 3 subtopics); same call as the APJ 11th Chemistry test. Blocks: ionic bonding + lattice
  // (Q1–5, 16–20), covalent (Q6–10), coordinate (Q11–15), VBT + hybridisation (Q21–25),
  // sigma/pi orbital overlap (Q26–30 → filed under Hybridization, the chapter's VBT home).
  // Semantic dedup vs the 65-q MHT-CET bank: 0 dup — the bank is MHT-CET PYQ material (MOT
  // bond orders, VSEPR shapes of XeF4/BrF5, formal charge) while this is a basic conceptual
  // worksheet; the 5 nearest rows (Q3/Q9/Q17/Q22/Q23) all ask the INVERSE question over
  // different option sets, so they are kept as new with a reviewNote. 2 rows HELD PRIVATE
  // as status:"flawed": Q5 (NO printed option is a true property of ionic compounds — all
  // four are the negations, so the option block looks inverted; keyed (A) only as an OMR
  // placeholder) and Q15 (three of the four options — NH3, H2O, Cl- — are all lone-pair
  // donating ligands, so only Na+ is definitely wrong; keyed (A), the canonical example).
  // The other 28 commit PRIVATE then flip PUBLIC.
  "chem-bonding-30": {
    slug: "chem-bonding-30",
    title: "MHT-CET Chemistry — Chemical Bonding (30 MCQs)",
    recordsFile: "chem-bonding-30.records.json",
    outName: "Tags_MHTCET_Chemistry_Chemical_Bonding_30",
    sourceFile: "MHTCET_Chemistry_Practice__Chemical_Bonding_30_MCQs.jpg",
    subjectName: "Chemistry",
    chapterName: "Chemical Bonding and Molecular Structure",
    examId: "70e70f9d-c20c-45c6-a346-0c914d65035d", // MHT-CET (not the default NDA EXAM_ID)
    subtopics: [
      "Ionic and Covalent Bonding, Lewis Structures and Octet Rule",
      "Dipole Moment, Polarity and Intermolecular Forces",
      "Hybridization",
      "VSEPR Theory and Molecular Geometry",
      "Molecular Orbital Theory and Bond Order",
    ],
    pyqNote: "MHT-CET Chemistry practice — LWS Chemical Bonding (30 MCQs)",
    examName: "MHT-CET",
    section: { key: "chemical-bonding", label: "Chemical Bonding" },
    bankAdd: true,
  },

  // LWS "MATHEMATICS (MCQ'S)" (22/07/2026) — 75-q NDA Maths test on the Class-11 SETS
  // chapter, in three printed sections: OBJECTIVE (Q1–54), ASSERT & REASONING (Q55–70,
  // the standard four A/R codes as options) and CASE STUDY (Q71, one 100-employee
  // three-floor Venn scenario with five sub-parts (i)–(v) → emitted as Q71–Q75 sharing
  // `context` + setLabel "CS1", so the OMR sheet has 75 rows). Born-digital PDF but
  // EVERY math expression is a rendered image — the text layer carries only the prose,
  // so all stems/options were vision-transcribed off page PNGs. No key is printed ON the
  // paper (every answer DERIVED, then independently re-derived); the LWS official key
  // arrived separately as a CSV covering Q1–Q70 only (no key for the Q71–75 case study).
  // Cross-check vs that key: 69/70 AGREE. The single divergence is Q45 (P({1,2}) power
  // set), where the official key marks (c) "phi not-in A" — provably false, since phi is
  // an element of every power set; (d) {1,2} in A is the unique correct option. Option (c)
  // was source-verified at 8x zoom, so this is a key error, not a transcription slip. On
  // the teacher's instruction the derived (d) is kept in BOTH the bank and the OMR sheet.
  // Single-chapter mode.
  // Semantic dedup vs the 153-q "Sets & Relations" bank: 4 dup (Q4 cheese/apples survey,
  // Q6 5-element power set, Q7 2^m−2^n=112, Q34 relations count 2^mn) + 4 MAYBE kept as
  // new (Q37/Q40/Q49/Q63 — same family, different quantities) — the paper is basic
  // Class-11 Sets while the bank leans NDA relations/counting, so it is largely net-new.
  // 7 rows HELD PRIVATE as status:"flawed" — printed defects; the official key confirmed
  // the derived best-guess on every one, so OMR grading is sound but they stay out of the
  // browsable bank: Q1 (Elements/Members synonymous → two correct options), Q10 + Q11
  // (stem fractions typeset flat, so the literal reading has no correct option), Q14 +
  // Q22 + Q51 (option glyphs corrupted / printed as raw LaTeX markup), Q53 (options (c)
  // and (d) identical). Q56 is figure-dependent — the PRINTED Venn shows A and B disjoint,
  // making the Assertion false → (d); the official key gives (d) for it AND for its
  // reprint at Q64, confirming the printed figure was intended, so it ships as "new" with
  // the diagram described in words. Q64 is status:"dup" — same assertion, same figure.
  // The other 63 commit PRIVATE then flip PUBLIC.
  "lws-sets-mcq": {
    slug: "lws-sets-mcq",
    title: "NDA Maths — Sets MCQ Test (22 Jul)",
    recordsFile: "lws-sets-mcq.records.json",
    outName: "Tags_LWS_Maths_Sets_MCQ_22Jul",
    sourceFile: "LWS_Maths_Practice__Sets_MCQ_22-07-2026.pdf",
    subjectName: "Mathematics",
    chapterName: "Sets & Relations",
    subtopics: [
      "Counting Sets, Subsets, and Inclusion-Exclusion",
      "Set Operations, Identities, and Cartesian Products of Sets",
      "Relations — Properties, Cartesian Product, and Counting",
    ],
    pyqNote: "NDA Maths practice — LWS Sets MCQ Test (22/07/2026)",
    examName: "NDA",
    section: { key: "sets-relations", label: "Sets & Relations" },
    bankAdd: true,
  },

  // LWS "Interior of Earth & POP 50 Q" — 50-q NDA GAT test spanning TWO subjects:
  // Geography (Q1–25, "Interior of Earth" statement-evaluation MCQs → Earth's
  // Structure chapter: Earth's Interior/Crust/Plate-Tectonics + Earthquakes/Seismic
  // Waves) and English (Q26–50, POP = Parts of Speech, identify-the-POS of the
  // underlined word → Grammar › Parts of Speech). Born-digital DOCX, clean text
  // layer, NO printed key (answers DERIVED). Multi-subject mode (subjects + per-record
  // subject+chapter). Semantic dedup vs the Geography Earth's-Structure + Grammar
  // banks: effectively all net-new (49 new / 1 maybe Q14 / 0 dup). Excel keyed to the
  // LWS OFFICIAL key (45/50 matched the derivation; 5 diverged → aligned to the key:
  // Q1 C, Q7 B, Q18 B, Q49 B, Q43 bonus/all). createPaper:false → bank ingest only,
  // no /dashboard/papers paper. 5 rows HELD PRIVATE as status:"flawed" (never
  // committed/PUBLIC — the questionable keys): Q1 + Q18 (official key looks factually
  // wrong — Kola 12.26 km / oceanic SiMa), Q16 (approximate figures + no clean
  // option), Q43 (bonus), Q49 (determiner-vs-conjunction debatable). The other 45
  // commit PRIVATE practice then flip PUBLIC.
  "interior-earth-pop-50": {
    slug: "interior-earth-pop-50",
    title: "NDA GAT — Interior of Earth & Parts of Speech (50 Q)",
    recordsFile: "interior-earth-pop-50.records.json",
    outName: "Tags_NDA_Interior_Earth_and_POP_50Q",
    sourceFile: "Interior of Earth & POP 50 Q.docx",
    subjects: {
      Geography: {
        "Earth's Structure, Landforms and Geological Time": [
          "Earth's Interior, Crust and Plate Tectonics",
          "Earthquakes and Seismic Waves",
        ],
      },
      English: {
        Grammar: ["Parts of Speech"],
      },
    },
    pyqNote: "NDA GAT practice — LWS Interior of Earth & Parts of Speech (50 Q)",
    examName: "NDA",
    section: { key: "interior-earth-pop-50", label: "Interior of Earth & POP (50 Q)" },
    bankAdd: true,
    createPaper: false, // bank ingest only — no /dashboard/papers paper (user's request)
  },

  // LWS "Maths Mock 2" (dated 20/07/2026, "6M") — 120-q NDA Maths mock (Marks 300,
  // Batch NDA Sep'26) spanning the algebra/trig/calculus/vector spine: Trigonometric
  // Identities (Q1–15 minus the equations), Trigonometric Equations (Q7,16–22),
  // Properties of Triangle (Q8,11,14,23–25,29,30,33,34), Height & Distance (Q26,27),
  // Inverse Trigonometry (Q32), Complex Numbers (Q35–51, incl. the cube-root-of-unity
  // Q43/Q47), Sequence & Series (Q52–68), Matrices & Determinants (Q69–85, several
  // image-rendered determinants), Indefinite Integration (Q86,91–101), Definite
  // Integration (Q94,101,102), Vectors (Q103–120). Born-digital PDF, clean-ish text
  // layer but math reflowed/scrambled → vision-transcribed from page PNGs; NO printed
  // key (every answer DERIVED). Single-subject multi-chapter mode. Flawed/low-conf
  // items flagged via reviewNote: Q114 (options a≡b), Q117 (correct answer absent from
  // options), Q83 (cut-off matrix entry), Q98 (option-B print typo), Q39 (only one of
  // the two valid general solutions is offered). Full ingest (paper + bank + Excel);
  // only status:"new" rows flip PUBLIC.
  "lws-maths-mock-2-jul": {
    slug: "lws-maths-mock-2-jul",
    title: "NDA Maths — LWS Mock 2 (20 Jul)",
    recordsFile: "lws-maths-mock-2-jul.records.json",
    outName: "Tags_LWS_Maths_Mock_2_20Jul",
    sourceFile: "LWS_Maths_Mock_2_20-7_6M.pdf",
    subjectName: "Mathematics",
    chapters: {
      "Trigonometric Identities": [
        "Compound Angle Formulas",
        "Multiple and Half-Angle Formulas",
        "Product-to-Sum and Sum-to-Product Identities",
        "Specific Values and Quadrants",
      ],
      "Trigonometric Equations": [
        "General Solutions and Counting Solutions of Trigonometric Equations",
        "Solving Specific Forms — Double-Angle, Product, Logarithmic, and Vieta",
      ],
      "Properties of Triangle": [
        "In-circle and Regular Polygon Geometry",
        "Sine and Cosine Rules — Solving Triangles",
        "Triangle Identities — A+B+C=π, Half-Angle, and Double-Angle",
      ],
      "Height & Distance": ["Heights and Distances from Angles of Elevation"],
      "Inverse Trigonometry": ["Evaluation of Composite Inverse Trigonometric Expressions"],
      "Complex Numbers": [
        "Cube Roots of Unity",
        "Modulus, Argument, and Conjugate",
        "Powers and Roots",
      ],
      "Sequence & Series": [
        "Arithmetic Progressions",
        "Geometric Progressions",
        "Harmonic Progressions and the Three Means",
        "Interrelating AP, GP and HP",
        "Special Series and Special Sums",
      ],
      "Matrices & Determinants": [
        "Cofactors, Adjoint, and Inverse",
        "Determinant Properties, Operations, and Sums",
        "Linear Systems — Consistency, Cramer's Rule, Solution Space",
        "Matrix Operations, Polynomials, and Equations",
        "Special Determinants — Trig, Complex, Roots of Unity, Polynomial",
        "Special Matrices — Skew-Symmetric, Diagonal, Idempotent, Orthogonal, Rotation",
      ],
      "Indefinite Integration": [
        "Integration by Partial Fractions",
        "Integration by Parts",
        "Integration by Substitution — Algebraic, Trigonometric, and Composite Forms",
        "Standard Forms — Exponential, Logarithmic, and Paired Trigonometric Integrals",
      ],
      "Definite Integration": [
        "Fundamental Theorem, Periodic Integrals, and Leibniz Rule",
        "Properties of Definite Integrals — Symmetry, King's, Odd/Even",
      ],
      Vectors: [
        "Cross Product and Triple Product",
        "Dot Product and Angle",
        "Magnitude, Components, Projection, and Direction Cosines",
        "Position Vectors and Section",
        "Vector Geometry — Triangles, Parallelograms, Quadrilaterals",
      ],
    },
    pyqNote: "NDA Maths practice — LWS Maths Mock 2 (20/07/2026)",
    examName: "NDA",
    section: { key: "maths-mock-2-jul", label: "Maths Mock 2 (20 Jul)" },
    bankAdd: true,
  },

  // LWS "English Mock Test 2 (Dinner)" — 50-q NDA English (GAT) MOCK spanning FOUR
  // chapters: Reading Comprehension (Q1–5 Passage-1 "subjective idealism", Q6–10
  // Passage-2 "twin paradox" → two shared passages: context + setLabel RC1/RC2 →
  // Inferential Comprehension), Vocabulary (Q11–15 similar-sounding-word triples →
  // Confusable Word Pairs; Q16–20 word↔meaning match-lists + Q21–30 single-word
  // usage-count → Word Definition), Grammar (Q31–40 discourse markers → Discourse
  // Markers and Connectors), Sentence Rearrangement (Q41–50 S1–S6 P/Q/R/S para-
  // jumbles → Paragraph Sequencing). Born-digital DOCX, clean text layer, NO printed
  // key (answers DERIVED). Single-subject multi-chapter mode (`chapters` + per-record
  // `chapter`). Low-confidence items flagged via reviewNote (Q11, Q22, Q24, Q26, Q31 —
  // vocab-usage judgment + one standalone connector). Full ingest scaffold present
  // (paper + bank + Excel); the tagged Excel is the immediate deliverable.
  "eng-mock-2-dinner": {
    slug: "eng-mock-2-dinner",
    title: "NDA English — Mock Test 2 (Dinner)",
    recordsFile: "eng-mock-2-dinner.records.json",
    outName: "Tags_NDA_English_Mock_2_Dinner",
    sourceFile: "English_Mock_Test_2_Dinner.docx",
    subjectName: "English",
    chapters: {
      "Reading Comprehension": [
        "Inferential Comprehension",
        "Literal Comprehension",
        "Vocabulary in Context",
      ],
      Vocabulary: ["Confusable Word Pairs", "Word Definition", "Synonyms", "Antonyms"],
      Grammar: ["Discourse Markers and Connectors"],
      "Sentence Rearrangement": ["Paragraph Sequencing (S1–S6)"],
    },
    pyqNote: "NDA English (GAT) mock — LWS English Mock Test 2 (Dinner)",
    examName: "NDA",
    section: { key: "eng-mock-2-dinner", label: "English Mock Test 2 (Dinner)" },
    bankAdd: true,
  },

  // LWS "English Mock Test (DINNER 3)" — 50-q NDA English (GAT) MOCK spanning FIVE
  // chapters: Spotting Errors (Q1–10 Common Errors → prepositions/verb-form/word-choice/
  // no-error, + Q11–20 Improvement of Sentences → Sentence Improvement), Fill in the
  // Blanks (Q21–25 single-word contextual → Contextual Fill-in-Blank), Vocabulary
  // (Q26–35 Synonyms), Cloze Test (Q36–45 one shared "Mass communication" passage →
  // Word Selection in Passage, context + setLabel CLOZE1), Reading Comprehension
  // (Q46–50 one shared Orwell "Politics and the English Language" passage → context +
  // setLabel RC1). Born-digital DOCX, clean text layer, NO printed key (answers
  // DERIVED). Single-subject multi-chapter mode (`chapters` + per-record `chapter`).
  // Semantic dedup vs the 1,223-q NDA English bank: 49 new / 1 maybe (Q27 DILIGENT, a
  // distinct synonym item — bank keys 'conscientious', this 'industrious' → kept new) /
  // 0 dup — effectively all net-new. Low-confidence items flagged via reviewNote (Q14
  // domestic/National, Q26 CENSURE, Q31 BEAUTIFUL, Q34 CONSIGNEE, Q39 cloze success/
  // power, Q49 RC distractor). Full ingest scaffold present (paper + bank + Excel);
  // the tagged Excel is the immediate deliverable, only status:"new" rows flip PUBLIC.
  "eng-dinner-3": {
    slug: "eng-dinner-3",
    title: "NDA English — Mock Test (Dinner 3)",
    recordsFile: "eng-dinner-3.records.json",
    outName: "Tags_NDA_English_Mock_Dinner_3",
    sourceFile: "English_Mock_Test_Dinner_3.docx",
    subjectName: "English",
    chapters: {
      "Spotting Errors": [
        "Word Choice, Prepositions and Punctuation",
        "Tense and Verb Form",
        "No Error (Correct Sentence)",
        "Sentence Improvement",
      ],
      "Fill in the Blanks": ["Contextual Fill-in-Blank"],
      Vocabulary: ["Synonyms"],
      "Cloze Test": ["Word Selection in Passage"],
      "Reading Comprehension": ["Inferential Comprehension", "Literal Comprehension"],
    },
    pyqNote: "NDA English (GAT) mock — LWS English Mock Test (Dinner 3)",
    examName: "NDA",
    section: { key: "eng-dinner-3", label: "English Mock Test (Dinner 3)" },
    bankAdd: true,
    createPaper: false, // bank ingest only (no /dashboard/papers paper)
  },

  // LWS "English Mock Test (DINNER 4)" — 50-q NDA English (GAT) MOCK spanning FIVE
  // chapters: Direct/Indirect Speech (Q1–10 → Grammar › Direct and Indirect Speech),
  // Antonyms (Q11–20 → Vocabulary › Antonyms), Idioms and Phrases (Q21–30 → Idiom
  // Meaning), Comprehension (Q31–35, one shared Titanic passage → context + setLabel
  // RC1, split across Inferential/Literal/Vocabulary-in-Context), One Word Substitution
  // (Q36–40 → Vocabulary › Word Definition), Active/Passive Voice (Q41–45 → Grammar ›
  // Active and Passive Voice), Sentence Rearrangement (Q46–50 P/Q/R/S part-jumbles →
  // Sentence Part Rearrangement (PQRS)). Born-digital DOCX, clean text layer, no key in
  // the paper itself (answers DERIVED) — but the teacher's official key arrived
  // afterwards as a separate CSV and every answer was cross-checked against it:
  // 49/50 AGREE, 1 mismatch (Q16, below). The three items flagged low-confidence at
  // derivation time (Q17 FALLIBLE, Q18 IMPERTINENT, Q19 ROUGH) are all CONFIRMED by the
  // official key. Single-subject multi-chapter mode (`chapters` + per-record
  // `chapter`). Semantic dedup vs the 1,296-q NDA English bank: 48 new / 2 dup — Q7
  // (bfe17d83, identical stem AND identical option order, bank key B confirms our
  // derivation) and Q27 "fair and square" (dfdcea82). Two MAYBEs adjudicated to NEW:
  // Q17 FALLIBLE (bank 59c8b76b keys 'perfect' over a disjoint option set) and Q34
  // 'maiden' (bank 8a7e69fa is a standalone synonym, ours is in-passage vocabulary).
  // The Titanic passage was additionally checked against questions.context (0 hits in
  // 3,206 context-bearing English rows), which the bank dump doesn't carry. 1 row HELD
  // PRIVATE as status:"flawed": Q16 PAROCHIAL, the sole key mismatch — three options
  // (international, global, world wide) are all defensible antonyms and 'global'/'world
  // wide' are outright synonyms of each other, so the item has no single defensible key.
  // Derived B by elimination; the OFFICIAL key says C ('global'), which is the better
  // answer on the natural local-vs-global axis, so the official key is preserved verbatim
  // (OMR grading must match how the students were graded) and the row stays PRIVATE.
  // Full ingest (paper + bank + Excel); the 47 status:"new" rows flip PUBLIC, the 2 dup
  // + 1 flawed stay PRIVATE as paper-backing only.
  "eng-dinner-4": {
    slug: "eng-dinner-4",
    title: "NDA English — Mock Test (Dinner 4)",
    recordsFile: "eng-dinner-4.records.json",
    outName: "Tags_NDA_English_Mock_Dinner_4",
    sourceFile: "English_Mock_Test_Dinner_4.docx",
    subjectName: "English",
    chapters: {
      Grammar: ["Direct and Indirect Speech", "Active and Passive Voice"],
      Vocabulary: ["Antonyms", "Word Definition"],
      "Idioms and Phrases": ["Idiom Meaning"],
      "Reading Comprehension": [
        "Inferential Comprehension",
        "Literal Comprehension",
        "Vocabulary in Context",
      ],
      "Sentence Rearrangement": ["Sentence Part Rearrangement (PQRS)"],
    },
    pyqNote: "NDA English (GAT) mock — LWS English Mock Test (Dinner 4)",
    examName: "NDA",
    section: { key: "eng-dinner-4", label: "English Mock Test (Dinner 4)" },
    bankAdd: true,
  },

  // LWS "NDA ENG BB3" — 50-q NDA English test spanning SIX chapters: Spotting Errors
  // (Q1–10), Sentence Improvement (Q11–15 → Spotting Errors › Sentence Improvement),
  // Homonyms (Q16–20 → Vocabulary › Confusable Word Pairs), Question Tags (Q21–25 →
  // Grammar › Sentence Completion), Idioms & Phrases (Q26–30), Sentence Rearrangement
  // (Q31–35, S1–S6), Reading Comprehension (Q36–40, one shared passage → context +
  // setLabel "RC1"), Synonyms (Q41–45) + Antonyms (Q46–50 → Vocabulary). Born-digital
  // PDF, clean text layer, NO printed key (answers DERIVED). Single-subject
  // multi-chapter mode (`chapters` + per-record `chapter`). Semantic dedup vs the
  // 1,127-q NDA English bank: 48 new / 2 dup (Q17 Overview/Review, Q18 Broke/Brook —
  // both in Vocabulary › Confusable Word Pairs). Full ingest (paper + bank + Excel);
  // only the 48 new flip PUBLIC.
  "nda-eng-bb3": {
    slug: "nda-eng-bb3",
    title: "NDA English — BB3",
    recordsFile: "nda-eng-bb3.records.json",
    outName: "Tags_NDA_English_BB3",
    sourceFile: "NDA_English_Practice__BB3.pdf",
    subjectName: "English",
    chapters: {
      "Spotting Errors": [
        "Articles, Determiners and Pronouns",
        "Word Choice, Prepositions and Punctuation",
        "Tense and Verb Form",
        "Subject-Verb Agreement",
        "No Error (Correct Sentence)",
        "Sentence Improvement",
      ],
      Grammar: ["Sentence Completion"],
      "Idioms and Phrases": ["Idiom Meaning"],
      "Sentence Rearrangement": ["Paragraph Sequencing (S1–S6)"],
      "Reading Comprehension": [
        "Inferential Comprehension",
        "Literal Comprehension",
        "Vocabulary in Context",
      ],
      Vocabulary: ["Confusable Word Pairs", "Synonyms", "Antonyms"],
    },
    pyqNote: "NDA English practice — LWS BB3",
    examName: "NDA",
    section: { key: "nda-eng-bb3", label: "NDA ENG BB3" },
    bankAdd: true,
  },
  // LWS "GAT FULL MOCK 4" - 150-q NDA GAT (General Ability Test) MOCK spanning FIVE
  // subjects: English (Q1-50), Geography/geomorphology (Q51-75), Current Affairs
  // (Q76-80), History/Vedic Civilisation (Q81-100), Physics (Q101-150). Born-digital
  // PDF, NO printed key (answers DERIVED). Multi-subject mode (subjects + per-record
  // subject+chapter). Semantic dedup vs the NDA bank (English/Geography/CA/History
  // sections are almost wholly reproduced from the existing pool; the CA+Vedic block
  // Q76-100 matches APJ GAT Mock 7 verbatim): 104 dup / 43 new / 3 flawed. Physics is
  // the bulk of the new material (36 new). Flawed = Q142/145/148 (figure-OPTION graph
  // questions - options are plots, not text; best-guess key for OMR, kept PRIVATE). RC
  // Q41-45 share one India-energy-security passage (context + setLabel "RC1").
  // createPaper:false => Excel + bank ingest only (no /dashboard/papers paper). Only
  // the 43 new flip PUBLIC.
  "gat-mock-4": {
    slug: "gat-mock-4",
    title: "NDA GAT - LWS Full Mock 4",
    recordsFile: "gat-mock-4.records.json",
    outName: "Tags_NDA_LWS_GAT_Full_Mock_4",
    sourceFile: "NDA_GAT_Practice__LWS_GAT_Full_Mock_4.pdf",
    subjects: {
      "Current Affairs": {
        "Awards, Honours, Books and Culture": ["Civilian Awards, Honours and Educational Institutions"],
        "Defence and Military Exercises": ["Defence Awards, Books and Institutions", "Military Exercises — Bilateral and Multilateral"],
        "International Affairs and Relations": ["International Organizations and Multilateral Bodies"],
        "Science and Technology": ["Space Technology and Astronomy"],
      },
      "English": {
        "Grammar": ["Articles, Determiners and Quantifiers", "Discourse Markers and Connectors", "Preposition Usage"],
        "Idioms and Phrases": ["Idiom Meaning"],
        "Reading Comprehension": ["Inferential Comprehension", "Literal Comprehension"],
        "Sentence Rearrangement": ["Paragraph Sequencing (S1–S6)"],
        "Spotting Errors": ["Mixed Error Detection", "No Error (Correct Sentence)", "Subject-Verb Agreement", "Tense and Verb Form", "Word Choice, Prepositions and Punctuation"],
        "Vocabulary": ["Antonyms", "Confusable Word Pairs", "Synonyms"],
      },
      "Geography": {
        "Earth's Structure, Landforms and Geological Time": ["Earth's Interior, Crust and Plate Tectonics", "Landforms and Mass Movements", "Volcanoes and Igneous Activity", "Weathering and Denudation"],
        "Indian Geography — Physical Features": ["Indian Rivers, Lakes and Water Bodies", "Mountains, Plateaus and Plains of India"],
        "World and Human Geography": ["Human Geography — Megacities and Population", "World — Rivers, Canals and Water Bodies"],
      },
      "History": {
        "Ancient India": ["Vedic Age, Society and Literature"],
      },
      "Physics": {
        "Electricity and Magnetism": ["Combination of Resistors", "Electric Current and Ohm's Law", "Electrical Devices", "Electrical Power, Energy and Heating", "Electrostatics", "Magnetism and Magnetic Effects of Current"],
        "Energy Sources": ["Energy Sources"],
        "Fluid Mechanics and Properties of Matter": ["Pressure and Surface Tension"],
        "Gravitation": ["Gravitational Field and Potential", "Newton's Law of Gravitation"],
        "Heat and Thermodynamics": ["Temperature and Thermometry"],
        "Kinematics and Motion": ["Circular Motion", "Equations of Motion and Graphs", "Projectile and Vertical Motion"],
        "Laws of Motion and Forces": ["Conservation of Momentum and Collisions", "Impulse and Momentum", "Newton's Laws of Motion", "Types of Forces"],
        "Light and Optics": ["Human Eye and Optical Instruments", "Lenses and Lens Formula", "Light Phenomena and Spectrum", "Prisms and Dispersion", "Reflection and Mirrors", "Refraction, Speed of Light and TIR"],
        "Modern Physics": ["Nuclear Physics", "Quantum and Modern EM"],
        "Oscillations and Waves": ["Simple Harmonic Motion and General Waves"],
        "Sound": ["Foundations — Sound, Perception, and the Ear", "Sound Behaviours — Reflection, Echo, Reverberation, Beats", "Wave Equation, Speed, and Frequency Bands"],
        "Units, Measurement and Dimensions": ["Units and Dimensions"],
        "Work, Energy and Power": ["Energy and Conservation", "Work and Work Done"],
      },
    },
    pyqNote: "NDA GAT practice - LWS GAT Full Mock 4",
    examName: "NDA",
    section: { key: "gat-full-mock-4", label: "GAT Full Mock 4" },
    bankAdd: true,
    createPaper: false, // Excel + bank ingest only (no /dashboard/papers paper)
  },
  // LWS "Chemistry — Mole Concept" — 30-q NDA Chemistry test, no printed key (answers
  // DERIVED). Scanned PDF (empty text layer) → all vision-transcribed. NCERT "Some
  // Basic Concepts of Chemistry" material, so MULTI-CHAPTER (uses `chapters` +
  // per-record `chapter`): states-of-matter (Q1–2) → "Matter and Its States", Dalton
  // postulates (Q7–8) → "Atomic Structure and Periodic Classification", everything else
  // (measurement basics, laws of combination, empirical/molecular formula, %
  // composition, stoichiometry, limiting reagent) → "Mole Concept and Stoichiometry".
  // Semantic dedup vs the 294-q NDA Chemistry bank: 29 new / 1 dup (Q12 conservation-
  // of-mass statement ≈ bank 2b99b67d) / 0 flawed. Excel-ONLY (bankAdd:false) at the
  // user's request: emit the OMR tagged sheet only — no bank commit, no paper. Flip
  // bankAdd:true to promote the 29 new questions into the bank later.
  "chem-mole-concept": {
    slug: "chem-mole-concept",
    title: "NDA Chemistry — Mole Concept Test",
    recordsFile: "chem-mole-concept.records.json",
    outName: "Tags_NDA_Chemistry_Mole_Concept",
    sourceFile: "NDA_Chemistry_Practice__Mole_Concept_Test.pdf",
    subjectName: "Chemistry",
    chapters: {
      "Matter and Its States": ["States of Matter, Phase Changes and Diffusion"],
      "Atomic Structure and Periodic Classification": ["Atomic Models: Dalton, Rutherford, Bohr"],
      "Mole Concept and Stoichiometry": [
        "Mole Concept, Avogadro's Law and Molar Calculations",
        "Stoichiometry and Laws of Chemical Combination",
      ],
    },
    pyqNote: "NDA Chemistry practice — LWS Mole Concept Test",
    examName: "NDA",
    section: { key: "mole-concept", label: "Mole Concept" },
    bankAdd: false, // Excel-only: emit the OMR tagged sheet, no bank commit / no paper
  },

  // LWS "NDA Practice Test — Physics: Units and dimensions, Vectors" (27-6-26) — 50-q
  // NDA Physics test, no printed key (answers DERIVED). Q1–25 Units & Dimensions,
  // Q26–50 Vectors. Born-digital PDF; the vector half (Q26–50) came through the text
  // layer cleanly, the dimensional-formula half (Q1–25) was vision-transcribed
  // (scrambled superscripts). Excel-ONLY (bankAdd:false): emit the OMR tagged sheet
  // only — NDA Physics has a "Units, Measurement and Dimensions" chapter but no
  // "Vectors" chapter, so a bank/paper ingest would need a taxonomy decision first.
  // Flagged: Q28 flawed (r×p gives 4i+8k; option B is 4i−8k, sign of k differs);
  // Q32 ambiguous ("coming back of A" read as same-direction → 15 km/h vs 145 km/h).
  "phys-units-vectors": {
    slug: "phys-units-vectors",
    title: "NDA Physics — Units, Dimensions and Vectors Test (27-6-26)",
    recordsFile: "phys-units-vectors.records.json",
    outName: "Tags_NDA_Physics_Units_and_Vectors",
    sourceFile: "NDA_Physics_Practice__Units_Dimensions_Vectors_Test.pdf",
    subjectName: "Physics",
    chapters: {
      "Units, Measurement and Dimensions": ["Units and Unit Conversion", "Dimensional Analysis"],
      Vectors: [
        "Vector Addition and Resultants",
        "Dot Product, Cross Product and Angle",
        "Vector Components and Geometry",
        "Relative Velocity and Motion",
      ],
    },
    pyqNote: "NDA Physics practice — LWS Units, Dimensions and Vectors Test (27-6-26)",
    examName: "NDA",
    section: { key: "units-dimensions-vectors", label: "Units, Dimensions and Vectors" },
    bankAdd: false, // Excel-only: emit the OMR tagged sheet, no bank commit / no paper
  },

  // LWS "Maths — Sequence and Series" — 41-q NDA Maths test (single correct), no
  // printed key (answers DERIVED). Scanned PDF (empty text layer) → all vision-
  // transcribed. Organised by printed section headers (General Term of AP, Summation
  // of AP, Properties of AP, Arithmetic Mean, GP, Summation of GP, Properties of GP,
  // Geometric Mean, HP, AM-GM-HM, AGP, Special Sequence Types 1 & 2) → mapped to the
  // 5 canonical "Sequence & Series" subtopics. Excel-ONLY (bankAdd:false): emit the
  // OMR tagged sheet.
  "maths-sequence-series": {
    slug: "maths-sequence-series",
    title: "NDA Maths — Sequence and Series Test",
    recordsFile: "maths-sequence-series.records.json",
    outName: "Tags_NDA_Maths_Sequence_and_Series",
    sourceFile: "NDA_Maths_Practice__Sequence_and_Series_Test.pdf",
    subjectName: "Mathematics",
    chapterName: "Sequence & Series",
    subtopics: [
      "Arithmetic Progressions",
      "Geometric Progressions",
      "Harmonic Progressions and the Three Means",
      "Interrelating AP, GP and HP",
      "Special Series and Special Sums",
    ],
    pyqNote: "NDA Maths practice — LWS Sequence and Series Test",
    examName: "NDA",
    section: { key: "sequence-series", label: "Sequence & Series" },
    bankAdd: false, // Excel-only: emit the OMR tagged sheet, no bank commit / no paper
  },

  // LWS "Matrices 6M QP 13-6-26" — 40-q NDA Maths test, no printed key (answers derived).
  "matrices-test": {
    slug: "matrices-test",
    title: "NDA Matrices Test (6M QP 13-6-26)",
    recordsFile: "matrices-test.records.json",
    outName: "Tags_NDA_Matrices_Test",
    sourceFile: "NDA_Maths_Practice__Matrices_Test_6M_QP.pdf",
    subjectName: "Mathematics",
    chapterName: "Matrices & Determinants",
    subtopics: [
      "Cofactors, Adjoint, and Inverse",
      "Determinant Properties, Operations, and Sums",
      "Linear Systems — Consistency, Cramer's Rule, Solution Space",
      "Matrix Operations, Polynomials, and Equations",
      "Special Determinants — Trig, Complex, Roots of Unity, Polynomial",
      "Special Matrices — Skew-Symmetric, Diagonal, Idempotent, Orthogonal, Rotation",
    ],
    pyqNote: "NDA Maths practice — LWS Matrices Test (6M QP 13-6-26)",
    examName: "NDA",
    section: { key: "matrices-determinants", label: "Matrices & Determinants" },
    bankAdd: true,
  },

  // LWS "Vectors_QP (B 13-6-26)" — 120-q NDA Vector Test (verified key). Excel-only
  // for now (bankAdd:false): not committed to the bank / no paper unless promoted.
  "vectors-b": {
    slug: "vectors-b",
    title: "NDA Vector Test (B 13-6-26)",
    recordsFile: "vectors-b.records.json",
    outName: "Tags_NDA_LWS_Vector_Test_B",
    sourceFile: "NDA_Maths_Practice__Vectors_Test_B.pdf",
    subjectName: "Mathematics",
    chapterName: "Vectors",
    subtopics: [
      "Position Vectors and Section",
      "Magnitude, Components, Projection, and Direction Cosines",
      "Dot Product and Angle",
      "Cross Product and Triple Product",
      "Vector Geometry — Triangles, Parallelograms, Quadrilaterals",
    ],
    pyqNote: "NDA Maths practice — LWS Vector Test (B 13-6-26)",
    examName: "NDA",
    section: { key: "vectors", label: "Vectors" },
    bankAdd: true,
  },

  // LWS "Acids Bases and Salts Test" — 75-q Foundation Course (Class 9/10 NCERT)
  // Chemistry test, no printed key (answers derived). Semantic dedup found ALL 75
  // already PUBLIC in the Foundation "Acids, Bases and Salts" chapter, so this is
  // Excel-only (bankAdd:false): emit the OMR tagged sheet, don't re-commit dups or
  // create a paper. See the lws-test-ingest decision log (2026-06-20).
  "foundation-abs-test": {
    slug: "foundation-abs-test",
    title: "Foundation Acids, Bases and Salts Test",
    recordsFile: "foundation-abs-test.records.json",
    outName: "Tags_Foundation_Acids_Bases_Salts",
    sourceFile: "Foundation_Chemistry__Acids_Bases_and_Salts_Test.pdf",
    subjectName: "Chemistry",
    chapterName: "Acids, Bases and Salts",
    examId: "22d88324-5624-486e-aaa1-52ccaf4e1281", // Foundation Course (not the default NDA EXAM_ID)
    subtopics: [
      "Indicators and the pH Scale",
      "Acids, Bases and Their Properties",
      "Salts — Preparation, Properties and Uses",
      "Neutralization and Reactions of Acids and Bases",
    ],
    pyqNote: "Foundation Chemistry practice — LWS Acids, Bases and Salts Test",
    examName: "Foundation Course",
    section: { key: "acids-bases-salts", label: "Acids, Bases and Salts" },
    bankAdd: false,
  },

  // LWS "APJ Maths Mock 5" — 120-q NDA Maths MOCK spanning 11 chapters, no printed
  // key (answers derived + verified). First MULTI-CHAPTER paper (uses `chapters` +
  // per-record `chapter`). Semantic dedup vs the 5,200-q NDA Maths bank: 68 dup /
  // 48 new / 4 flawed. The whole 120-q test is committed PRIVATE + filed in one
  // "APJ Maths Mock 5" paper section (OMR Q-order); only the 48 new flip PUBLIC.
  // Re-derivation surfaced 4 EXISTING bank wrong-keys (logged to SUGGESTIONS.md).
  "apj-maths-mock-5": {
    slug: "apj-maths-mock-5",
    title: "NDA Maths — APJ Mock 5",
    recordsFile: "apj-maths-mock-5.records.json",
    outName: "Tags_NDA_APJ_Maths_Mock_5",
    sourceFile: "NDA_Maths_Practice__APJ_Maths_Mock_5.pdf",
    subjectName: "Mathematics",
    chapters: {
      "Limits & Continuity": [
        "Limit Evaluation Techniques — L'Hôpital, Rationalization, Standard Forms",
        "One-Sided Limits, Greatest Integer, and Absolute Value Limits",
        "Continuity and Differentiability — Piecewise, Modulus, Composed, Oscillatory",
      ],
      "Differentiation": [
        "Differentiation Techniques — Chain Rule, Logarithmic, Composite Functions",
        "Parametric, Implicit, and Higher-Order Derivatives",
        "Differentiability of Absolute Value, Piecewise, and Greatest Integer Functions",
      ],
      "Application of Derivatives": [
        "Tangents and Slopes",
        "Monotonicity, Extrema, and Critical Points",
        "Optimisation — Geometric, Trigonometric, AM-GM",
      ],
      "Trigonometric Identities": [
        "Specific Values and Quadrants",
        "Compound Angle Formulas",
        "Multiple and Half-Angle Formulas",
        "Product-to-Sum and Sum-to-Product Identities",
        "Maximum and Minimum of Trigonometric Expressions",
      ],
      "Trigonometric Equations": [
        "General Solutions and Counting Solutions of Trigonometric Equations",
        "Solving Specific Forms — Double-Angle, Product, Logarithmic, and Vieta",
        "Simultaneous and Combined Trigonometric Systems",
      ],
      "Properties of Triangle": [
        "Sine and Cosine Rules — Solving Triangles",
        "Triangle Identities — A+B+C=π, Half-Angle, and Double-Angle",
        "In-circle and Regular Polygon Geometry",
      ],
      "Complex Numbers": [
        "Modulus, Argument, and Conjugate",
        "Powers and Roots",
        "Cube Roots of Unity",
      ],
      "Lines": [
        "Equation, Slope, and Family of Lines",
        "Distance, Section, and Locus",
        "Angle Between Lines, Parallelism, and Perpendicularity",
        "Triangles, Quadrilaterals, and Polygons",
      ],
      "Circles": [
        "Circle Equation — Centre, Radius, Diameter, and Properties",
        "Circles Through Given Points and Concyclicity",
        "Inscribed Geometry, Tangents, and Segments",
      ],
      "Matrices & Determinants": [
        "Matrix Operations, Polynomials, and Equations",
        "Special Matrices — Skew-Symmetric, Diagonal, Idempotent, Orthogonal, Rotation",
        "Determinant Properties, Operations, and Sums",
        "Special Determinants — Trig, Complex, Roots of Unity, Polynomial",
        "Cofactors, Adjoint, and Inverse",
        "Linear Systems — Consistency, Cramer's Rule, Solution Space",
      ],
      "Sequence & Series": [
        "Arithmetic Progressions",
        "Geometric Progressions",
        "Harmonic Progressions and the Three Means",
        "Interrelating AP, GP and HP",
        "Special Series and Special Sums",
      ],
    },
    pyqNote: "NDA Maths practice — LWS APJ Maths Mock 5",
    examName: "NDA",
    section: { key: "apj-maths-mock-5", label: "APJ Maths Mock 5" },
    bankAdd: true,
  },

  // LWS "APJ GAT Mock 5" — 150-q NDA GAT (General Ability Test) MOCK spanning FIVE
  // subjects: English (Q1–50 + the embedded grammar Qs 56, 62), Geography (Q51–100),
  // Physics (Q101–120), Chemistry (Q121–142), Biology (Q143–150). No printed key
  // (answers derived). First MULTI-SUBJECT paper (uses `subjects` + per-record
  // `subject`+`chapter`). createPaper:false => Excel + bank ingest only, no paper.
  // Semantic dedup: 85 new / 61 dup / 4 flawed. Physics + Biology sections are wholly
  // reproduced from an existing bank mock (all dup). Comprehension Q31–35 share one
  // passage (context + setLabel "RC1"). Only the 85 new flip PUBLIC.
  "apj-gat-mock-5": {
    slug: "apj-gat-mock-5",
    title: "NDA GAT — APJ Mock 5",
    recordsFile: "apj-gat-mock-5.records.json",
    outName: "Tags_NDA_APJ_GAT_Mock_5",
    sourceFile: "NDA_GAT_Practice__APJ_GAT_Mock_5.docx",
    subjects: {
      English: {
        Grammar: ["Active and Passive Voice", "Correct Sentence Identification", "Direct and Indirect Speech"],
        "Idioms and Phrases": ["Idiom Meaning"],
        "Reading Comprehension": ["Inferential Comprehension", "Literal Comprehension"],
        "Sentence Rearrangement": ["Paragraph Sequencing (S1–S6)"],
        "Spotting Errors": ["No Error (Correct Sentence)"],
        Vocabulary: ["Antonyms", "Word Definition"],
      },
      Geography: {
        "Climatology, Atmosphere and Weather": ["Climate Classification and Zones", "Humidity, Condensation, Clouds and Precipitation"],
        "Earth's Structure, Landforms and Geological Time": ["Earth's Interior, Crust and Plate Tectonics", "Landforms and Mass Movements", "Soils"],
        "Indian Geography — Economy, Resources and Transport": ["Agriculture, Crops, Soils and Land Use"],
        "Indian Geography — Physical Features": [
          "Forests and Natural Vegetation of India", "Indian Rivers, Lakes and Water Bodies",
          "Indian Soils and Climate-Agriculture", "Indian States and Islands",
          "Location, Extent and Frontiers of India", "Mountains, Plateaus and Plains of India",
        ],
      },
      Physics: {
        "Electricity and Magnetism": [
          "Cells, EMF and Kirchhoff's Laws", "Combination of Resistors", "Electrical Power, Energy and Heating",
          "Electrostatics", "Magnetic Force and Fleming's Rules", "Magnetism and Magnetic Effects of Current",
          "Resistance and Resistivity",
        ],
      },
      Chemistry: {
        "Carbon and Its Compounds": [
          "Allotropes of Carbon", "Catenation, Tetra-valency and Isomerism",
          "Functional Groups and Common Organic Compounds", "Hydrocarbons and Organic Classification",
        ],
      },
      Biology: {
        Reproduction: [
          "Angiosperm Reproduction — Pollination and Fertilization", "Meiosis and DNA in Flowering Plants",
          "Sexual Reproduction — Genetic Principles",
        ],
      },
    },
    pyqNote: "NDA GAT practice — LWS APJ GAT Mock 5",
    examName: "NDA",
    section: { key: "apj-gat-mock-5", label: "APJ GAT Mock 5" },
    bankAdd: true,
    createPaper: false, // Excel + bank ingest only (no /dashboard/papers paper)
  },

  // LWS "APJ 11th Chemistry Test" — 25-q MHT-CET Chemistry test on Periodic
  // Classification (Class-11), born-digital .docx, no printed key (answers derived).
  // First MHT-CET paper here (examId override). Semantic dedup vs the 16-q MHT-CET
  // "Modern Periodic Table" bank: all 25 NEW (the bank had zero ionisation-energy /
  // atomic-radius-ordering questions). 20 new / 5 flawed (multiple-correct or
  // correct-answer-absent defects: Q13, 15, 16, 18, 25). createPaper:false => Excel
  // + bank ingest only (no /dashboard/papers paper); only the 20 new flip PUBLIC.
  "apj-11th-chem-test": {
    slug: "apj-11th-chem-test",
    title: "APJ 11th Chemistry Test (Periodic Classification)",
    recordsFile: "apj-11th-chem-test.records.json",
    outName: "Tags_MHTCET_APJ_11th_Chemistry",
    sourceFile: "MHTCET_Chemistry_Practice__APJ_11th_Chemistry_Test.docx",
    subjectName: "Chemistry",
    chapterName: "Modern Periodic Table",
    examId: "70e70f9d-c20c-45c6-a346-0c914d65035d", // MHT-CET (not the default NDA EXAM_ID)
    subtopics: ["Periodic Trends", "Position in Periodic Table and Electronic Configuration"],
    pyqNote: "MHT-CET Chemistry practice — LWS APJ 11th Chemistry Test",
    examName: "MHT-CET",
    section: { key: "modern-periodic-table", label: "Modern Periodic Table" },
    bankAdd: true,
    createPaper: false, // Excel + bank ingest only (no /dashboard/papers paper)
  },

  // LWS "GAT FULL MOCK 3" — 150-q NDA GAT (General Ability Test) MOCK spanning FOUR
  // subjects: English (Q1–50), Geography (Q51–101), Physics (Q102–134), Chemistry
  // (Q135–150). Born-digital PDF, no printed key (answers derived). Multi-subject
  // mode (`subjects` + per-record `subject`+`chapter`). createPaper:false => Excel +
  // bank ingest only, no /dashboard/papers paper. Semantic dedup vs the NDA bank +
  // heavy internal repeats (Ring of Fire / Oceanic trenches / Mariana Trench recur):
  // 101 new / 48 dup / 1 flawed. RC Q11–15 share one Symbiosis passage (context +
  // setLabel "RC1"). Only the 101 new flip PUBLIC.
  "gat-mock-3": {
    slug: "gat-mock-3",
    title: "NDA GAT — LWS Full Mock 3",
    recordsFile: "gat-mock-3.records.json",
    outName: "Tags_NDA_LWS_GAT_Full_Mock_3",
    sourceFile: "NDA_GAT_Practice__LWS_GAT_Full_Mock_3.pdf",
    subjects: {
      English: {
        "Sentence Rearrangement": ["Sentence Part Rearrangement (PQRS)"],
        Grammar: ["Parts of Speech"],
        "Reading Comprehension": ["Inferential Comprehension", "Literal Comprehension"],
        "Idioms and Phrases": ["Idiom Meaning"],
        Vocabulary: ["Antonyms", "Synonyms"],
        "Spotting Errors": [
          "Mixed Error Detection", "No Error (Correct Sentence)", "Subject-Verb Agreement",
          "Tense and Verb Form", "Word Choice, Prepositions and Punctuation",
        ],
      },
      Geography: {
        "Earth's Structure, Landforms and Geological Time": [
          "Earth's Interior, Crust and Plate Tectonics", "Earthquakes and Seismic Waves",
          "Landforms and Mass Movements", "Rocks, Minerals and Geological Time",
          "Volcanoes and Igneous Activity",
        ],
        "Climatology, Atmosphere and Weather": [
          "Atmospheric Layers, Composition and Aurora", "Atmospheric Pressure and Winds",
          "Insolation, Temperature and Solar Geometry",
        ],
        "Indian Geography — Physical Features": [
          "Indian Rivers, Lakes and Water Bodies", "Mountains, Plateaus and Plains of India",
        ],
        Oceanography: ["Ocean Waves and Sea-Floor Topography"],
      },
      Physics: {
        "Light and Optics": [
          "Human Eye and Optical Instruments", "Lenses and Lens Formula",
          "Reflection and Mirrors", "Refraction, Speed of Light and TIR",
        ],
        "Electricity and Magnetism": [
          "Combination of Resistors", "Electric Current and Ohm's Law", "Electrical Devices",
          "Electrical Power, Energy and Heating", "Electrostatics",
          "Magnetic Force and Fleming's Rules", "Magnetism and Magnetic Effects of Current",
        ],
      },
      Chemistry: {
        "Chemistry in Everyday Life": ["Medicines and Health Chemistry"],
        "Acids, Bases and Salts": [
          "Acid-Base Theory: Concepts, Oxides and Electrolytes", "Common Acids: Names, Formulas and Uses",
          "Salts and Common Compounds", "pH Scale and Common Substances",
        ],
        "Atomic Structure and Periodic Classification": [
          "Atomic Number, Mass Number and Subatomic Particles", "Periodic Trends, Valency and Atomicity",
        ],
        "Metals and Non-Metals": ["Reactivity Series and Reactions with Water"],
        "Chemical Bonding": ["Bond Counting and Molecular Structure", "Ionic and Covalent Bonding"],
      },
    },
    pyqNote: "NDA GAT practice — LWS GAT Full Mock 3",
    examName: "NDA",
    section: { key: "gat-full-mock-3", label: "GAT Full Mock 3" },
    bankAdd: true,
    createPaper: false, // Excel + bank ingest only (no /dashboard/papers paper)
  },

  // LWS "APJ Full Mock 6" — 100-q NDA GAT MOCK spanning three subjects: English
  // (Q1–50), Physics (Q51–75, Electricity & Magnetism), Chemistry (Q76–100, Carbon
  // + Acids). Born-digital PDF, no printed key (answers DERIVED). Multi-subject mode
  // (`subjects` + per-record `subject`+`chapter`). Semantic dedup vs the NDA bank:
  // English 50 new (genuinely new sentences/idioms/antonyms), Physics 25 dup +
  // Chemistry 25 dup (all classic recurring NDA GK already in the corpus, derived
  // answers confirmed against the bank). Comprehension Q31–35 share one passage
  // (context + setLabel "RC1"). Excel-only (bankAdd:false): emit the OMR tagged sheet.
  "apj-gat6": {
    slug: "apj-gat6",
    title: "NDA GAT — APJ Full Mock 6",
    recordsFile: "apj-gat6.records.json",
    outName: "Tags_NDA_APJ_GAT_Full_Mock_6",
    sourceFile: "NDA_GAT_Practice__APJ_Full_Mock_6.pdf",
    subjects: {
      English: {
        Grammar: ["Active and Passive Voice", "Direct and Indirect Speech"],
        Vocabulary: ["Antonyms", "Word Definition"],
        "Idioms and Phrases": ["Idiom Meaning"],
        "Reading Comprehension": ["Inferential Comprehension", "Literal Comprehension"],
        "Sentence Rearrangement": ["Sentence Part Rearrangement (PQRS)"],
      },
      Physics: {
        "Electricity and Magnetism": [
          "Cells, EMF and Kirchhoff's Laws", "Combination of Resistors",
          "Electrical Power, Energy and Heating", "Electrostatics",
          "Magnetic Force and Fleming's Rules", "Magnetism and Magnetic Effects of Current",
        ],
      },
      Chemistry: {
        "Carbon and Its Compounds": [
          "Allotropes of Carbon", "Catenation, Tetra-valency and Isomerism",
          "Functional Groups and Common Organic Compounds", "Hydrocarbons and Organic Classification",
        ],
        "Acids, Bases and Salts": ["Water of Crystallization", "pH Scale and Common Substances"],
      },
    },
    pyqNote: "NDA GAT practice — LWS APJ Full Mock 6",
    examName: "NDA",
    section: { key: "apj-gat-full-mock-6", label: "APJ GAT Full Mock 6" },
    bankAdd: false, // Excel-only for now: emit the OMR tagged sheet
  },

  // LWS "Maths Mock 3" — 120-q NDA Maths MOCK spanning four chapters: Vectors
  // (Q1–20, 71–80), Differentiation (Q21–40, 81–90), Definite Integration
  // (Q41–70), Indefinite Integration (Q91–120). Born-digital PDF, no printed key
  // (answers DERIVED + independently verified). Multi-chapter mode (`chapters` +
  // per-record `chapter`). Semantic dedup vs the NDA Maths bank found the WHOLE
  // paper reassembled from the existing pool: 117 dup / 0 new / 3 flawed (Q2, Q11,
  // Q20 — correct value not among the printed options / duplicate options). So this
  // is Excel-only (bankAdd:false): emit the OMR tagged sheet, don't re-commit dups
  // or create a paper. Re-derivation surfaced existing bank wrong-keys (Q14, Q18,
  // Q71 → C; Q36 → B; Q86 → A) — the Excel uses the correct derived answers;
  // backfill of the bank rows is logged for separate review.
  "maths-mock-3": {
    slug: "maths-mock-3",
    title: "NDA Maths — LWS Mock 3",
    recordsFile: "maths-mock-3.records.json",
    outName: "Tags_NDA_LWS_Maths_Mock_3",
    sourceFile: "NDA_Maths_Practice__LWS_Maths_Mock_3.pdf",
    subjectName: "Mathematics",
    chapters: {
      Vectors: [
        "Cross Product and Triple Product",
        "Dot Product and Angle",
        "Magnitude, Components, Projection, and Direction Cosines",
        "Position Vectors and Section",
        "Vector Geometry — Triangles, Parallelograms, Quadrilaterals",
      ],
      Differentiation: [
        "Differentiability of Absolute Value, Piecewise, and Greatest Integer Functions",
        "Differentiation Techniques — Chain Rule, Logarithmic, Composite Functions",
        "Parametric, Implicit, and Higher-Order Derivatives",
      ],
      "Definite Integration": [
        "Area Under Curves",
        "Definite Integrals in Function Conditions",
        "Fundamental Theorem, Periodic Integrals, and Leibniz Rule",
        "Integration of Absolute Value, Piecewise, and Greatest Integer Functions",
        "Properties of Definite Integrals — Symmetry, King's, Odd/Even",
      ],
      "Indefinite Integration": [
        "Integration by Partial Fractions",
        "Integration by Parts",
        "Integration by Substitution — Algebraic, Trigonometric, and Composite Forms",
        "Standard Forms — Exponential, Logarithmic, and Paired Trigonometric Integrals",
      ],
    },
    pyqNote: "NDA Maths practice — LWS Maths Mock 3",
    examName: "NDA",
    section: { key: "maths-mock-3", label: "Maths Mock 3" },
    bankAdd: false, // Excel-only: the whole paper is duplicate of the existing bank
  },

  // LWS "Weekly Test — Physics (Calculus Foundation)" — 25-q foundation calculus
  // test (derivatives Q1–13, integrals Q14–25), born-digital .docx, no printed key
  // (answers DERIVED). Excel-ONLY at the user's request (bankAdd:false): emit the
  // OMR tagged sheet, do NOT commit to the bank or create a paper. Subject column =
  // "Physics" (per the paper title / user); content is pure differentiation +
  // integration, filed under a "Calculus Foundation" chapter with two subtopics.
  "lws-weekly-calculus": {
    slug: "lws-weekly-calculus",
    title: "LWS Weekly Test — Physics (Calculus Foundation)",
    recordsFile: "lws-weekly-calculus.records.json",
    outName: "Tags_LWS_Weekly_Calculus_Foundation",
    sourceFile: "LWS_Weekly_Test__Physics_Calculus_Foundation.docx",
    subjectName: "Physics",
    chapterName: "Calculus Foundation",
    subtopics: ["Differentiation", "Integration"],
    pyqNote: "LWS Weekly Test — Physics (Calculus Foundation)",
    examName: "NDA",
    section: { key: "calculus-foundation", label: "Calculus Foundation" },
    bankAdd: false, // Excel-only: emit the OMR tagged sheet, no bank commit / no paper
  },

  // LWS "Part Of Speech Test" — 80-q NDA English grammar test, no printed key
  // (answers derived from the underlined word in each sentence). Dedup found all
  // 80 NEW vs the 108-q NDA Grammar bank, so it's a full ingest (paper + bank +
  // Excel). All map to the "Parts of Speech" subtopic.
  "parts-of-speech-test": {
    slug: "parts-of-speech-test",
    title: "NDA Parts of Speech Test",
    recordsFile: "parts-of-speech-test.records.json",
    outName: "Tags_NDA_Parts_of_Speech_Test",
    sourceFile: "NDA_English_Practice__Parts_of_Speech_Test.pdf",
    subjectName: "English",
    chapterName: "Grammar",
    subtopics: ["Parts of Speech"],
    pyqNote: "NDA English practice — LWS Parts of Speech Test",
    examName: "NDA",
    section: { key: "grammar", label: "Grammar" },
    bankAdd: true,
  },

  // LWS "Maths — Complex Numbers" — 46-q NDA Maths test (single correct), no printed
  // key (answers DERIVED). Scanned PDF (empty text layer) → all vision-transcribed.
  // Organised by printed section headers (Intro / Algebra / Conjugate / Modulus /
  // Argument / Amplitude / Representation / De-Moivre / Cube+nth Roots / Geometry /
  // Locus / Triangular Inequality) → mapped to the 3 canonical "Complex Numbers"
  // subtopics. Semantic dedup vs the 158-q NDA Complex Numbers bank: 38 new / 6 dup
  // (Q16, Q17, Q18, Q29, Q41, Q46) / 2 flawed (Q7 options A=C identical; Q43
  // multiple-correct A & C). Full ingest (paper + bank + Excel); only the 38 new flip
  // PUBLIC.
  "maths-complex-numbers": {
    slug: "maths-complex-numbers",
    title: "NDA Maths — Complex Numbers Test",
    recordsFile: "maths-complex-numbers.records.json",
    outName: "Tags_NDA_Maths_Complex_Numbers",
    sourceFile: "NDA_Maths_Practice__Complex_Numbers_Test.pdf",
    subjectName: "Mathematics",
    chapterName: "Complex Numbers",
    subtopics: [
      "Modulus, Argument, and Conjugate",
      "Powers and Roots",
      "Cube Roots of Unity",
    ],
    pyqNote: "NDA Maths practice — LWS Complex Numbers Test",
    examName: "NDA",
    section: { key: "complex-numbers", label: "Complex Numbers" },
    bankAdd: true,
  },

  // LWS "APJ GAT Mock 7" — 150-q NDA GAT (General Ability Test) MOCK spanning SEVEN
  // subjects: English (Q1–50), Geography/geomorphology (Q51–75), Current Affairs
  // (Q76–80), History/Vedic Civilisation (Q81–100), Physics/Light & Optics
  // (Q101–123), Chemistry (Q124–146: mole concept + organic/IUPAC + fullerenes),
  // Biology (Q147–150: genetics/DNA/evolution). Born-digital .docx, NO printed key
  // (all 150 answers DERIVED). Multi-subject mode (`subjects` + per-record
  // `subject`+`chapter`). Excel-ONLY (bankAdd:false) at the user's request: emit the
  // OMR tagged sheet only — no bank commit, no /dashboard/papers paper. RC Q41–45
  // share one passage (context + setLabel "RC1").
  "gat-mock-7": {
    slug: "gat-mock-7",
    title: "NDA GAT — APJ Mock 7",
    recordsFile: "gat-mock-7.records.json",
    outName: "Tags_NDA_APJ_GAT_Mock_7",
    sourceFile: "NDA_GAT_Practice__APJ_GAT_Mock_7.docx",
    // Chapters/subtopics are CANONICAL DB names for the NEW (committed) rows; the
    // dup-only ad-hoc names are kept alongside so validateRecords passes for the
    // 77 dup rows (which are never committed — createPaper:false commits new only).
    subjects: {
      English: {
        Vocabulary: ["Antonyms", "Synonyms", "Homonyms", "Word Definition", "Confusable Word Pairs"],
        Grammar: [
          "Prepositions", "Discourse Markers", "Preposition Usage",
          "Articles, Determiners and Quantifiers", "Discourse Markers and Connectors",
        ],
        "Spotting Errors": [
          "Error Detection", "No Error (Correct Sentence)", "Mixed Error Detection",
          "Tense and Verb Form", "Subject-Verb Agreement", "Word Choice, Prepositions and Punctuation",
        ],
        "Sentence Rearrangement": ["Paragraph Sequencing (S1–S6)"],
        "Idioms and Phrases": ["Idiom Meaning"],
        "Reading Comprehension": ["Inferential Comprehension", "Literal Comprehension"],
      },
      Geography: {
        "Earth's Structure, Landforms and Geological Time": [
          "Fluvial Landforms and River Erosion", "Glacial Landforms",
          "Arid and Desert Landforms", "Coastal Landforms", "Karst and Cave Landforms",
          "Structural Landforms — Folds and Faults", "Igneous Intrusions and Weathering",
          "Geomorphic Agents and Landform Matching", "Landforms and Mass Movements",
        ],
        "Indian Geography — Physical Features": ["Indian Rivers, Lakes and Water Bodies"],
        "World & Human Geography": ["World Rivers and Regions"],
      },
      "Current Affairs": {
        "Defence and Military Exercises": [
          "Defence Awards, Books and Institutions", "Military Exercises — Bilateral and Multilateral",
        ],
        "Science and Technology": ["Space Technology and Astronomy"],
        "International Affairs and Relations": ["International Organizations and Multilateral Bodies"],
        "Awards, Honours, Books and Culture": ["Civilian Awards, Honours and Educational Institutions"],
      },
      History: {
        "Ancient India": ["Vedic Age, Society and Literature"],
      },
      Physics: {
        "Light and Optics": [
          "Reflection and Mirrors", "Refraction, Speed of Light and TIR",
          "Lenses and Lens Formula",
        ],
      },
      Chemistry: {
        "Mole Concept and Stoichiometry": [
          "Avogadro's Law and the Mole", "Mole–Mass–Volume Calculations",
        ],
        "Carbon and Its Compounds": [
          "IUPAC Nomenclature", "Isomerism", "Allotropes of Carbon and Fullerenes",
        ],
      },
      Biology: {
        "Genetics and Evolution": [
          "Molecular Basis of Inheritance (DNA)", "Genes and Alleles",
          "Evolution and Naturalists",
        ],
      },
    },
    pyqNote: "NDA GAT practice — LWS APJ GAT Mock 7",
    examName: "NDA",
    section: { key: "apj-gat-mock-7", label: "APJ GAT Mock 7" },
    bankAdd: true,
    createPaper: false, // bank-only ingest of the 73 status:"new" rows; no /dashboard/papers paper
  },

  // LWS "Vectors Balanced Practice Set" (NDA_Physics_Vectors_Balanced_MCQs_v3) — 25-q
  // NDA Physics Vectors test, born-digital .docx, clean text layer, NO printed key
  // (all 25 answers DERIVED). Excel-ONLY (bankAdd:false), mirroring `phys-units-vectors`:
  // NDA Physics has a "Units, Measurement and Dimensions" chapter but NO "Vectors"
  // chapter, so a bank/paper ingest would need a taxonomy decision first — the ask here
  // is only the OMR tagged sheet. Same four ad-hoc Vectors subtopics as phys-units-vectors.
  // Flagged: Q8 flawed (parallelogram-from-diagonals area = 5√3 = √75 ≈ 8.66 is not among
  // the printed options √21/√42/2√42/4√2; keyed B as nearest for OMR grading). Derived
  // answer distribution A×9 · B×7 · C×8 · D×1 (the paper genuinely has one D key, Q12).
  "phys-vectors-balanced": {
    slug: "phys-vectors-balanced",
    title: "NDA Physics — Vectors Balanced Practice Set (v3)",
    recordsFile: "phys-vectors-balanced.records.json",
    outName: "Tags_NDA_Physics_Vectors_Balanced",
    sourceFile: "NDA_Physics_Vectors_Balanced_MCQs_v3.docx",
    subjectName: "Physics",
    chapterName: "Vectors",
    subtopics: [
      "Vector Addition and Resultants",
      "Dot Product, Cross Product and Angle",
      "Vector Components and Geometry",
      "Relative Velocity and Motion",
    ],
    pyqNote: "NDA Physics practice — LWS Vectors Balanced Practice Set (v3)",
    examName: "NDA",
    section: { key: "vectors", label: "Vectors" },
    bankAdd: false, // Excel-only: emit the OMR tagged sheet, no bank commit / no paper
  },

  // LWS "APJ GAT Mock 8" — 150-q NDA GAT (General Ability Test) MOCK spanning FOUR
  // subjects: English (Q1–50), Geography (Q51–100), Physics (Q101–125, Light &
  // Optics), Chemistry (Q126–150, Acids/Bases/Salts). Born-digital .docx; formulas
  // recovered via pandoc→LaTeX. NO printed key (answers DERIVED + cross-checked vs
  // the bank). Multi-subject mode (`subjects` + per-record `subject`+`chapter`).
  // Semantic dedup vs the NDA bank: 59 new / 90 dup / 1 flawed. English is wholly
  // new (idioms/RC/completions/synonyms/antonyms); Physics + Chemistry are entirely
  // recurring; Geography is mostly recurring with a new vegetation cluster. Source-doc
  // artifact: Q32 truncated jumbled stem (flawed, best-guess key + note); Q33–35 are
  // an internal duplicate of Q23–25 (status "dup" — kept for OMR parity). Re-derivation
  // flagged an EXISTING bank wrong-key at Q57 (Match river-basin/town: bank keys C,
  // geographically impossible — Uttarkashi is on the Bhagirathi; Excel uses correct B)
  // → logged for backfill review. Q93 (Chir vs Deodar) + Q98 (Red Sanders IUCN
  // year-sensitivity) flagged. createPaper:false => Excel + bank ingest, no
  // /dashboard/papers paper. Of the 59 status:"new", 58 committed + flipped PUBLIC;
  // Q69 (Narmada/Jabalpur monsoon cloze) turned out byte-identical to an existing
  // NDA row and deduped at commit (content_hash) — it already lives in the bank.
  "apj-gat8": {
    slug: "apj-gat8",
    title: "NDA GAT — APJ Mock 8",
    recordsFile: "apj-gat8.records.json",
    outName: "Tags_NDA_APJ_GAT_Mock_8",
    sourceFile: "NDA_GAT_Practice__APJ_GAT_Mock_8.docx",
    subjects: {
      English: {
        Grammar: ["Preposition Usage", "Sentence Completion"],
        "Idioms and Phrases": ["Idiom Meaning"],
        "Reading Comprehension": ["Inferential Comprehension", "Literal Comprehension"],
        "Sentence Rearrangement": ["Sentence Part Rearrangement (PQRS)"],
        "Spotting Errors": ["No Error (Correct Sentence)", "Tense and Verb Form"],
        Vocabulary: ["Antonyms", "Synonyms"],
      },
      Geography: {
        "Earth's Structure, Landforms and Geological Time": ["Landforms and Mass Movements", "Soils"],
        "Indian Geography — Economy, Resources and Transport": ["Agriculture, Crops, Soils and Land Use"],
        "Indian Geography — Physical Features": [
          "Forests and Natural Vegetation of India", "Indian Rivers, Lakes and Water Bodies",
          "Indian Soils and Climate-Agriculture", "Location, Extent and Frontiers of India",
        ],
        "World and Human Geography": ["World — Rivers, Canals and Water Bodies"],
      },
      Physics: {
        "Light and Optics": [
          "Lenses and Lens Formula", "Prisms and Dispersion",
          "Reflection and Mirrors", "Refraction, Speed of Light and TIR",
        ],
      },
      Chemistry: {
        "Acids, Bases and Salts": [
          "Acid-Base Theory: Concepts, Oxides and Electrolytes", "Common Acids: Names, Formulas and Uses",
          "Salts and Common Compounds", "Water of Crystallization", "pH Scale and Common Substances",
        ],
      },
    },
    pyqNote: "NDA GAT practice — LWS APJ GAT Mock 8",
    examName: "NDA",
    section: { key: "apj-gat-mock-8", label: "APJ GAT Mock 8" },
    bankAdd: true,
    createPaper: false, // Excel + (optional) bank ingest only; no /dashboard/papers paper
  },

  // LWS "Geomorphology and Landforms Mock Test" — 50-q NDA Geography (GAT) MOCK on the
  // NCERT "Geomorphic Processes" + "Landforms and their Evolution" chapters (exogenic/
  // endogenic forces, diastrophism, weathering, mass movement, and fluvial/glacial/
  // karst/arid/coastal landforms). Single-subject single-chapter: everything files
  // under "Earth's Structure, Landforms and Geological Time" across three subtopics
  // (Landforms and Mass Movements / Weathering and Denudation / Earth's Interior,
  // Crust and Plate Tectonics). Born-digital DOCX, clean text layer, NO printed key
  // (answers DERIVED from NCERT). Dedup ran FIRST on stems vs the 86-row chapter bank:
  // 0 DUP, 1 MAYBE (Q9, kept new — distinct 2-statement question), 49 NEW → all 50
  // status:"new". Low-confidence items flagged via reviewNote (Q11 energy-source set,
  // Q15 biological-weathering odd-one-out, Q37 assertion-reason, Q47 polje).
  "geo-geomorphology-landforms": {
    slug: "geo-geomorphology-landforms",
    title: "NDA Geography — Geomorphology and Landforms Mock Test",
    recordsFile: "geo-geomorphology-landforms.records.json",
    outName: "Tags_NDA_Geography_Geomorphology_Landforms",
    sourceFile: "GEOMORPHOLOGY_AND_LANDFORMS_Mock_Test.docx",
    subjectName: "Geography",
    chapterName: "Earth's Structure, Landforms and Geological Time",
    subtopics: [
      "Landforms and Mass Movements",
      "Weathering and Denudation",
      "Earth's Interior, Crust and Plate Tectonics",
    ],
    pyqNote: "NDA Geography (GAT) practice — LWS Geomorphology and Landforms Mock Test",
    examName: "NDA",
    section: { key: "geomorphology-landforms", label: "Geomorphology and Landforms" },
    bankAdd: true,
  },
};

export function requirePaper(slug: string | undefined): PaperSpec {
  if (!slug || !PAPERS[slug]) {
    throw new Error(`unknown paper "${slug}". Known: ${Object.keys(PAPERS).join(", ")}`);
  }
  return PAPERS[slug];
}

export function loadRecords(spec: PaperSpec): PaperRec[] {
  const recs: PaperRec[] = JSON.parse(readFileSync(join(DATA, spec.recordsFile), "utf-8"));
  return recs.sort((a, b) => a.n - b.n);
}

export const statusOf = (r: PaperRec): "new" | "dup" | "flawed" => r.status ?? "new";

/** The DB exam id for a paper — its own examId override, else the default NDA EXAM_ID. */
export const examIdOf = (spec: PaperSpec): string => spec.examId ?? EXAM_ID;

/** The canonical DB subject a record files under: its own `subject` (multi-subject
 *  mode), else the paper's single `subjectName`. Throws if neither is set. */
export function subjectOf(spec: PaperSpec, r: PaperRec): string {
  const s = r.subject ?? spec.subjectName;
  if (!s) throw new Error(`Q${r.n}: no subject (record has no \`subject\` and spec has no \`subjectName\`)`);
  return s;
}

/** The canonical DB chapter a record files under: its own `chapter`, else the paper's
 *  single `chapterName`. Throws if neither is set (mis-configured record). */
export function chapterOf(spec: PaperSpec, r: PaperRec): string {
  const ch = r.chapter ?? spec.chapterName;
  if (!ch) throw new Error(`Q${r.n}: no chapter (record has no \`chapter\` and spec has no \`chapterName\`)`);
  return ch;
}

/** Valid DB subtopics for a chapter under this paper: the multi-chapter `chapters`
 *  entry, else the single-chapter `subtopics`. Throws if neither is configured. */
export function subtopicsFor(spec: PaperSpec, chapter: string): string[] {
  const subs = spec.chapters?.[chapter] ?? spec.subtopics;
  if (!subs) throw new Error(`no subtopics configured for chapter "${chapter}"`);
  return subs;
}

/** Valid DB subtopics for THIS record — multi-subject `subjects[subject][chapter]`,
 *  else the chapter-keyed `subtopicsFor`. Throws if the subject/chapter isn't configured. */
export function validSubtopicsFor(spec: PaperSpec, r: PaperRec): string[] {
  if (spec.subjects) {
    const subj = subjectOf(spec, r);
    const chs = spec.subjects[subj];
    if (!chs) throw new Error(`Q${r.n}: subject not in spec.subjects: "${subj}"`);
    const subs = chs[chapterOf(spec, r)];
    if (!subs) throw new Error(`Q${r.n}: chapter not in spec.subjects["${subj}"]: "${chapterOf(spec, r)}"`);
    return subs;
  }
  return subtopicsFor(spec, chapterOf(spec, r));
}

/** All chapters this paper touches (for logging) — across subjects, or `chapters` keys, or the single chapter. */
export const chaptersOf = (spec: PaperSpec): string[] =>
  spec.subjects
    ? [...new Set(Object.values(spec.subjects).flatMap((chs) => Object.keys(chs)))]
    : spec.chapters
      ? Object.keys(spec.chapters)
      : spec.chapterName
        ? [spec.chapterName]
        : [];

/** All subjects this paper touches (for logging). */
export const subjectsOf = (spec: PaperSpec): string[] =>
  spec.subjects ? Object.keys(spec.subjects) : spec.subjectName ? [spec.subjectName] : [];

/** Hard-validate a record set; throws on the first problem (transcription bug). */
export function validateRecords(spec: PaperSpec, recs: PaperRec[]): void {
  const seen = new Set<number>();
  for (const r of recs) {
    if (seen.has(r.n)) throw new Error(`duplicate question number ${r.n}`);
    seen.add(r.n);
    if (!LABELS.includes(r.answer as OptionLabel)) throw new Error(`Q${r.n}: bad answer "${r.answer}"`);
    if (!DIFFICULTIES.has(r.difficulty)) throw new Error(`Q${r.n}: bad difficulty "${r.difficulty}"`);
    subjectOf(spec, r); // throws on a record with no resolvable subject
    const ch = chapterOf(spec, r);
    if (spec.chapters && !spec.subjects && !spec.chapters[ch]) throw new Error(`Q${r.n}: chapter not in spec.chapters: "${ch}"`);
    const subs = new Set(validSubtopicsFor(spec, r));
    if (!subs.has(r.subtopic)) throw new Error(`Q${r.n}: subtopic not valid for "${subjectOf(spec, r)} › ${ch}": "${r.subtopic}"`);
    for (const [lab, val] of [["A", r.optA], ["B", r.optB], ["C", r.optC], ["D", r.optD]] as const) {
      if (!val || !val.trim()) throw new Error(`Q${r.n}: empty option ${lab}`);
    }
  }
}

/** Record -> a QuestionRow for buildTagRows (the OMR/tagged-Excel path). */
export function recToQuestionRow(spec: PaperSpec, r: PaperRec): QuestionRow {
  const texts: Record<OptionLabel, string> = { A: r.optA, B: r.optB, C: r.optC, D: r.optD };
  const options: OptionRow[] = LABELS.map((label) => ({
    label, text: texts[label], isCorrect: label === r.answer, imageUrl: null,
  }));
  const subjectName = subjectOf(spec, r);
  return {
    id: `${spec.slug}-${r.n}`,
    text: r.stem,
    context: r.context ?? null,
    difficulty: r.difficulty,
    solution: r.solution,
    imageUrl: null,
    setId: r.setLabel ? `${spec.slug}:${r.setLabel}` : null,
    questionNumber: String(r.n),
    pyqYear: null,
    pyqMonth: null,
    pyqNote: null,
    exam: { id: spec.examName.toLowerCase(), name: spec.examName },
    subject: { id: subjectName.toLowerCase(), name: subjectName },
    chapter: { id: chapterOf(spec, r).toLowerCase().replace(/[^a-z0-9]+/g, "-"), name: chapterOf(spec, r) },
    subtopic: { id: r.subtopic, name: r.subtopic },
    options,
  };
}

/** Record -> a ParsedRowPayload for commitStaged (the bank-ingestion path). */
export function recToParsedRow(spec: PaperSpec, r: PaperRec): ParsedRowPayload {
  const texts: Record<OptionLabel, string> = { A: r.optA, B: r.optB, C: r.optC, D: r.optD };
  const options = LABELS.map((label) => ({ label, text: texts[label], isCorrect: label === r.answer }));
  return {
    sourceRow: r.n,
    questionNumber: String(r.n),
    setLabel: r.setLabel,
    subjectName: subjectOf(spec, r),
    chapterName: chapterOf(spec, r),
    subtopicName: r.subtopic,
    context: r.context,
    text: r.stem,
    difficulty: r.difficulty,
    solution: r.solution,
    options,
    contentHash: contentHash(r.stem, [r.optA, r.optB, r.optC, r.optD], r.answer),
  };
}
