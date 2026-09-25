/**
 * Exam-context registry + pure URL/route resolvers used by the primary nav.
 *
 * The cookie-backed exam picker stores a stable slug (e.g. `"nda"`). UUIDs are
 * resolved at render time against the `exams` table by `loadActiveExam` so the
 * Bank tab can emit `/browse?examId=<uuid>` without hard-coding ids in TS.
 *
 * Exams that don't have a `/guide` subtree yet fall back to the `/guide`
 * index. Notes route to a per-exam hub (`/notes/<slug>`) that lists every
 * notes subject for that exam (or an honest "coming soon" when none have
 * shipped) — derived from NOTES_CHAPTERS, so a new exam needs no new page.
 */

export type ExamSlug =
  | "nda"
  | "mht-cet"
  | "jee-mains"
  | "cds"
  | "foundation-course"
  | "neet"
  | "mh-hsc-12"
  | "cbse-10"
  | "cbse-11"
  | "cbse-12"
  | "isc-12"
  | "mh-sb-9"
  | "mh-sb-11"
  | "mh-ssc-10"
  | "worksheets-11-12"
  | "ipmat-indore"
  | "ipmat-rohtak"
  | "jipmat";

/**
 * School boards the bank carries content for. NOT every exam has one — a
 * coaching/entrance exam (NDA, NEET, the Foundation Course) has no board.
 */
export type Board = "Maharashtra State Board" | "CBSE" | "CISCE";

/** School class. */
export type Std = 9 | 10 | 11 | 12;

/**
 * The three stages a signed-in student's exam feed is built around
 * (EXAM_TIER_SPEC.md). A signed-in student sees their tier's exams first; the
 * rest collapse under "Other exams". Anonymous visitors see everything.
 */
export type ExamTier = "school" | "senior" | "graduate";

export const EXAM_TIERS: readonly ExamTier[] = ["school", "senior", "graduate"];

export const TIER_LABELS: Record<ExamTier, string> = {
  school: "Class 9–10",
  senior: "Class 11–12 & droppers",
  graduate: "Graduation & after",
};

export type ExamEntry = {
  /** URL-safe slug; the value stored in the `qb:exam` cookie. */
  slug: ExamSlug;
  /** Short label for the exam, e.g. on the /browse landing cards. */
  displayName: string;
  /** Canonical name in the `exams` DB table — used to resolve the UUID. */
  examName: string;
  /**
   * The exam's TYPICAL eligibility stage — one value. A student who targets
   * exams in two tiers (CDS + NDA is the common case) is handled by the union
   * rule in `resolveExamFeed`, which always shows a chosen target, NOT by
   * giving an exam a second tier here. Required, so a new exam cannot land
   * without one.
   */
  tier: ExamTier;
  /** `/guide/<slug>` subtree if shipped; null falls back to `/guide`. */
  guidesPath: string | null;
  /** Per-exam notes hub `/notes/<slug>`; null falls back to the `/notes` index. */
  notesPath: string | null;
  /**
   * Exam has NO past-year corpus — its bank is entirely `question_kind='practice'`
   * (e.g. the Foundation Course worksheets). `/browse` defaults the kind filter to
   * "practice" for it, so the default view isn't an empty PYQ list.
   */
  practiceOnly?: boolean;
  /**
   * A school-board exam (Maharashtra State Board, later CBSE, …) whose corpus is
   * a textbook laid out in book sections (Solved Examples → Exercise → …). These
   * get the `/board` reader — a book-faithful, exercise-by-exercise view keyed on
   * the section_* columns (migration 0043) — and the "Board" nav tab.
   */
  boardExam?: boolean;
  /**
   * Exam has published mock tests (real PYQ papers served as timed, auto-graded
   * online tests at `/mock`). Drives the gated "Mocks" primary-nav tab — shown
   * only when the active exam actually has mocks, like Papers is member-gated.
   */
  hasMocks?: boolean;
  /**
   * The exam's PUBLIC corpus holds more than one `question_format` (migrations
   * 0041 + 0061) — MCQ alongside subjective and/or numeric. Drives whether the
   * `/browse` Format control is rendered at all: five exams are 100% MCQ, where
   * it could only ever be a no-op.
   *
   * A REGISTRY FLAG rather than a live count, and that was measured, not
   * assumed. The obvious implementation — one grouped aggregate per render
   * window — is a 49,372-row seq scan (~4.4s, 8,838 buffers) that EXCEEDS the
   * anon role's 3s statement_timeout, and splitting it per exam still leaves
   * JEE Mains at ~3.7s. Serving it would mean either an index on the most
   * heavily written table in the schema or raising a timeout, to decide whether
   * to draw a control. So it is declared here, where `practiceOnly` /
   * `boardExam` / `hasMocks` already live, and `tests/format-mix-registry`
   * re-measures it against the live bank on every prod-contract run so it
   * cannot silently rot. Both drift directions are benign — see
   * shouldShowFormatFilter, which pins the control on whenever the filter is
   * active and so can never strand a viewer with an invisible narrowing.
   */
  mixedFormats?: boolean;
  /**
   * This exam has NO PUBLIC questions — it is ingested-but-private, or not yet
   * ingested at all. It is kept in the registry (so its routes, flags and
   * grouping are declared in one place and the launch is a one-line edit), but
   * it must NOT be offered to a student as a target exam: that choice is
   * persisted to `student_profiles.target_exams` and then steers `/drill`, the
   * mock recommendations and the report email, so picking an empty exam sets a
   * target that resolves to nothing everywhere, with no error to explain it.
   *
   * A LIVE DEFECT, NOT A PRECAUTION: `isc-12` shipped here and rendered as a
   * chip on /welcome + /account while its `examName` resolved to no `exams` row
   * at all. The flag is what removes that chip.
   *
   * HAND-DECLARED, like `mixedFormats` above and for the same reason — the chip
   * list is a module-level const built from static TS, with no request in which
   * to count rows. A declared fact rots, so `tests/exam-registry-content` is
   * the standing probe: it re-measures this against the live bank on every
   * prod-contract run and fails in BOTH directions (flag stale after a PUBLIC
   * flip; flag missing on an exam that has quietly emptied).
   *
   * NOT the same thing as being absent from the registry. `UPSC CSE (Prelims)`
   * is deliberately not here at all, because none of it will ever be
   * student-visible; this flag is for an exam that is on its way in.
   */
  noPublicContent?: boolean;
  /**
   * A NON-BOARD presentation family — the generic sibling of `board`+`std`.
   *
   * IPMAT is three separate exams (Indore, Rohtak, Jammu) that a student thinks
   * of as one thing, exactly as CBSE 11/12 are. But they are neither a board
   * nor a class, so they cannot use `board`+`std`, and overloading `board` to
   * carry "IPMAT" would make that field lie for every non-board family after.
   *
   * Declare `family`+`familyLabel` together; an entry that declares only one
   * falls through to a flat picker entry rather than forming a broken family.
   * Members order by their position in this registry, since there is no class
   * number to sort on — so the order below IS the order students see.
   */
  family?: string;
  /** This exam's label inside its `family` ("Indore"). See `family`. */
  familyLabel?: string;
  /**
   * The NOUN for the control that picks between this family's members
   * ("Institute"). It describes the family, so every member declares the same
   * value. Board families omit it and default to "Class".
   *
   * It exists because that control's label was hardcoded "Class" — true while
   * every family was a school ladder, and a lying label the moment one wasn't:
   * IPMAT's members are institutes, so "Class → Indore" would be wrong.
   */
  familyAxis?: string;
  /**
   * The board+class this exam IS. The `exams` table conflates the two into one
   * row ("Maharashtra State Board Class 10"), so this registry is the ONLY place
   * they can be separated — which is what lets the written-paper builder offer
   * independent Board and Std dropdowns.
   *
   * Declare both or neither (asserted in tests). Omit for coaching/entrance
   * exams: NDA and NEET aren't board exams at all, and the Foundation Course
   * spans Class 9 AND 10, so it is a course, not a (board, std) pair.
   */
  board?: Board;
  std?: Std;
  /**
   * Overrides the derived `Class <std>` label used by the grouped exam pickers
   * (see lib/exam/examFamily). Set ONLY where a board names its years something
   * students actually say and search for — Maharashtra's SSC (10) and HSC (12).
   * Everywhere else the label is derived, so there is nothing to keep in sync.
   *
   * This is a label for the CLASS WITHIN ITS FAMILY, not a replacement for
   * `displayName`, which still names the exam standalone (chips, cards, the
   * /browse active-filter chip).
   */
  classLabel?: string;
};

export const EXAM_REGISTRY: readonly ExamEntry[] = [
  {
    slug: "nda",
    tier: "senior",
    displayName: "NDA",
    examName: "NDA",
    guidesPath: "/guide/nda",
    notesPath: "/notes/nda", // exam hub: lists Maths + Physics + Biology notes
    hasMocks: true, // 18 NDA Maths Paper I mocks published at /mock
  },
  {
    slug: "mht-cet",
    tier: "senior",
    displayName: "MHT-CET",
    examName: "MHT-CET",
    guidesPath: "/guide/mht-cet", // hub: MHT-CET Mathematics (Template C)
    notesPath: "/notes/mht-cet", // exam hub: MHT-CET Maths notes
    hasMocks: true, // 60 mocks: Paper I (Maths) + Paper II (Phy & Chem) per sitting
  },
  {
    slug: "jee-mains",
    tier: "senior",
    displayName: "JEE Mains",
    examName: "JEE Mains", // must match the `exams` DB row exactly
    mixedFormats: true, // Section-B NAT: 2,900 numeric alongside 7,593 MCQ
    hasMocks: true, // 24 Paper 1 mocks (2025+2026 shifts) published at /mock
    guidesPath: null, // no /guide subtree yet — falls back to the index
    notesPath: "/notes/jee-mains", // exam hub: "coming soon" until JEE notes ship
  },
  {
    slug: "cds",
    tier: "graduate",
    displayName: "CDS",
    examName: "CDS", // must match the `exams` DB row exactly
    guidesPath: null, // no /guide subtree yet — falls back to the index
    notesPath: "/notes/cds", // exam hub: live since 2026-09-15 (Mathematics — Number System)
    hasMocks: true, // CDS English mocks (2017-I … 2026-I) published at /mock
  },
  {
    slug: "foundation-course",
    tier: "school",
    displayName: "Foundation",
    examName: "Foundation Course", // must match the `exams` DB row exactly
    guidesPath: null, // no /guide subtree — falls back to the index
    notesPath: "/notes/foundation-course", // exam hub: "coming soon" until notes ship
    practiceOnly: true, // worksheet-only corpus → /browse defaults to the Practice view
  },
  {
    slug: "neet",
    tier: "senior",
    displayName: "NEET",
    examName: "NEET", // must match the `exams` DB row exactly
    guidesPath: null, // no /guide subtree yet — falls back to the index
    notesPath: "/notes/neet", // exam hub: "coming soon" until NEET notes ship
    hasMocks: true, // 8 NEET (UG) mocks (2021-2026 + 2 Re-NEET) published at /mock
  },
  {
    slug: "mh-hsc-12",
    tier: "senior",
    displayName: "MH HSC 12",
    examName: "Maharashtra HSC Class 12", // must match the `exams` DB row exactly
    classLabel: "Class 12 (HSC)", // grouped pickers: HSC is what Maharashtra students say
    mixedFormats: true, // 2,582 subjective vs 268 MCQ
    guidesPath: null, // no /guide subtree yet — falls back to the index
    notesPath: "/notes/mh-hsc-12", // exam hub: "coming soon" until notes ship
    // NOT practiceOnly since 2026-08-13: Class 12 IS a board year and the board
    // PYQ corpus is now in — 317 questions across ALL 15 Maths chapters, every
    // sitting 2015-2025 (no 2021, the exams were cancelled). The flag tracks
    // whether an exam HAS past-year questions, not which corpus is larger; the
    // textbook side is still ~8x bigger and reachable on the /browse toggle.
    // Same call as mh-ssc-10, which is not practiceOnly for the same reason.
    // Caveat worth knowing before reading the PYQ view as complete: the source
    // is a chapterwise compilation, not reconstructed sittings — coverage runs
    // 38-45 of the 44 questions in a paper — so it cannot back a /mock sitting.
    boardExam: true, // gets the /board reader + the "Board" nav tab
    board: "Maharashtra State Board",
    std: 12,
  },
  {
    slug: "cbse-10",
    tier: "school",
    displayName: "CBSE Class 10",
    examName: "CBSE Class 10", // must match the `exams` DB row exactly
    guidesPath: null, // no /guide subtree yet — falls back to the index
    notesPath: "/notes/cbse-10", // exam hub: "coming soon" until notes ship
    //
    // `practiceOnly` HERE IS A "NOT YET", NOT THE PERMANENT PROPERTY IT IS FOR
    // cbse-11. Class 10 IS a board year, so this exam CAN carry CBSE Class 10
    // board PYQs later, exactly as cbse-12 did — and dropping the flag then is
    // not cosmetic: `listChapterLandings` derives `kind = practiceOnly ?
    // "practice" : "pyq"`, so it also switches every chapter landing page from
    // textbook questions to board PYQs. Measure the landing-page impact before
    // dropping it (scripts/cbse-12-pyq/flip-impact.ts is the precedent).
    //
    // Until then the NCERT textbook corpus is the whole bank, so /browse must
    // default to the Practice toggle — without the flag the default view is an
    // empty PYQ list.
    practiceOnly: true,
    boardExam: true, // NCERT textbook content → gets the /board reader + the "Board" nav tab
    board: "CBSE",
    std: 10,
    //
    // `mixedFormats` ADDED 2026-09-18 WITH Ch.14 Probability's PUBLIC flip, and
    // the sequencing is the point: tests/format-mix-registry.test.ts fails an
    // exam flagged mixed whose bank holds only one format, so the flag can never
    // go in ahead of the rows. Through Ch.1, Ch.6, Ch.12 and Ch.13 this corpus
    // was 100% subjective and the flag was correctly ABSENT.
    //
    // The trigger was Ex 14.1 Q4 — "Which of the following cannot be the
    // probability of an event?" with (A) 2/3, (B) −1.5, (C) 15%, (D) 0.7 —
    // a genuine four-option MCQ with rival ANSWERS, not one of the sub-part
    // either/or lists that produced the Class-11 near-misses (see that entry
    // below). It was predicted from Ch.8 / Ch.10, which carry the book's other
    // MCQs; Ch.14 simply got there first. ~7 MCQs exist in the whole book
    // against ~600 subjective items, so this exam is mixed by a hair — which is
    // exactly the case the standing probe exists to keep honest.
    mixedFormats: true,
  },
  {
    slug: "cbse-11",
    tier: "senior",
    displayName: "CBSE Class 11",
    examName: "CBSE Class 11", // must match the `exams` DB row exactly
    guidesPath: null, // no /guide subtree yet — falls back to the index
    notesPath: "/notes/cbse-11", // exam hub: "coming soon" until notes ship
    practiceOnly: true, // NCERT textbook corpus; Class 11 is not a board year, so this exam can NEVER carry PYQs (the mh-sb-11 shape, unlike cbse-12 where CBSE PYQs are a later phase)
    boardExam: true, // NCERT textbook content → gets the /board reader + the "Board" nav tab
    board: "CBSE",
    std: 11,
    mixedFormats: true, // 1,612 subjective vs 5 MCQ (re-measured 2026-09-08, Physics complete)
    //
    // THE HISTORY MATTERS HERE, because this flag was once wrong in a way that
    // looked permanent. It read "NO mixedFormats — and unlike the other board
    // corpora that is a PERMANENT property, not a 'not yet'", on a measurement
    // of the NCERT Class 11 **Maths** book, which genuinely contains ZERO MCQs
    // (no "Choose the correct answer" instruction anywhere, no four-option run
    // in any of its 14 chapters) against 29 in Class 12 Maths.
    //
    // That claim was measured on one SUBJECT while this flag is EXAM-scoped.
    // PHYSICS landed on this exam on 2026-09-07 and does contain genuine
    // four-option MCQs, so the "permanent" property lasted exactly as long as
    // the exam had one subject. Predicted here before it happened, then
    // triggered by Ch.4 Laws of Motion Ex 4.4 (the net centripetal force on a
    // particle whirled on a string) — NOT by the Ch.5 questions 5.9/5.10 the
    // earlier note named, though those are real MCQs too and are still to come.
    //
    // Two near-misses worth keeping, because both look like MCQs and are not:
    // "Choose the correct alternative" in Ch.2/Ch.7 (and Class 12 Ch.12) heads
    // a SUB-PART list where each (a)/(b)/(c)/(d) carries its own inline either/or
    // ("increases/decreases with increasing altitude"); and Ch.6 Q6.1 lists
    // "(i) sphere, (ii) cylinder, (iii) ring, (iv) cube" inside one subjective
    // question. Key on whether the four alternatives are RIVAL ANSWERS, never on
    // the instruction line or the label shape.
    //
    // tests/format-mix-registry.test.ts re-measures this against the live bank
    // in both directions.
  },
  {
    slug: "cbse-12",
    tier: "senior",
    displayName: "CBSE Class 12",
    examName: "CBSE Class 12", // must match the `exams` DB row exactly
    mixedFormats: true, // 760 MCQ vs 2,696 subjective (re-measured 2026-09-08, Physics complete)
    guidesPath: null, // no /guide subtree yet — falls back to the index
    notesPath: "/notes/cbse-12", // exam hub: "coming soon" until notes ship
    // NOT practiceOnly since 2026-08-21: Class 12 IS a board year and the board
    // PYQ corpus is in — 1,766 questions from all 78 papers of 2022-2026, beside
    // the 1,414 NCERT textbook rows on the SAME chapters, separated by
    // `question_kind`. The mh-ssc-10 / mh-hsc-12 shape.
    //
    // Dropping the flag is not cosmetic: `listChapterLandings` derives
    // `kind = practiceOnly ? "practice" : "pyq"`, so it also switches all 13
    // chapter landing pages from textbook questions to board PYQs. Measured
    // before the change (scripts/cbse-12-pyq/flip-impact.ts): 12 chapters keep
    // their page, Application of Integrals GAINS one (14 textbook rows, below
    // the threshold, against 74 PYQs), and NONE loses one — so no indexed URL
    // disappears.
    boardExam: true, // textbook content → keeps the /board reader + "Board" nav tab
    board: "CBSE",
    std: 12,
  },
  {
    slug: "isc-12",
    tier: "senior",
    displayName: "ISC Class 12",
    examName: "ISC Class 12", // must match the `exams` DB row exactly
    guidesPath: null, // no /guide subtree yet — falls back to the index
    notesPath: "/notes/isc-12", // exam hub: "coming soon" until notes ship
    // NOT practiceOnly: Class 12 IS a board year and this corpus is PYQ-only by
    // construction — CISCE's own past papers (question_kind='pyq'). Unlike
    // cbse-12, there is no textbook layer here to default to, so the flag would
    // be wrong in both directions.
    //
    // ⚠ NOT boardExam — AND "ISC is a school board, so boardExam: true" IS THE
    // WRONG INFERENCE. The flag tracks whether an exam has a TEXTBOOK-STRUCTURED
    // corpus (the `section_kind`/`section_seq` book axis behind the /board
    // reader), not whether the exam belongs to a board. That distinction is
    // recorded in the mh-ssc-10 entry above, which flipped to true only when its
    // Balbharati textbook layer landed — six days AFTER its PYQs did. ISC ships
    // papers and no textbook, so /board would render an exam with nothing to
    // read, and board:lint (which iterates BOARD_EXAMS over question_kind=
    // 'practice' rows) would widen its scope to an exam that owns none.
    // If an ISC textbook corpus is ever ingested, flip this then, not now.
    //
    // ⚠ NO mixedFormats YET, and that is a correctness requirement rather than
    // caution. `tests/format-mix-registry` measures this flag against the LIVE
    // BANK in both directions, and its rule for an exam with no PUBLIC rows is
    // "absent-and-unflagged is the correct state" — a flag an exam cannot yet
    // earn. It was briefly set here from the PAPERS (all three PCM papers do
    // carry MCQ, fill-in-the-blanks and long-form subjective in one sitting)
    // and that failed the contract suite, which is right: the flag describes
    // the corpus, and the corpus is empty.
    //
    // SET IT AT THE FIRST INGEST, from a live count, not from the papers — the
    // cbse-11 entry records what happens when it is set from one subject and
    // then treated as a permanent property of the exam.
    //
    // ⚠ NOTHING IS INGESTED — not one row, and `examName` resolves to NO `exams`
    // row at all (the corpus is PAUSED; see the ISC ingestion notes). Until that
    // changes this exam must not be offered as a student target: it shipped as a
    // live chip on /welcome + /account pointing at an exam that exists nowhere.
    // Remove the flag at the first PUBLIC row, not at the first ingest.
    noPublicContent: true,
    board: "CISCE",
    std: 12,
    // A CISCE family of one degrades to a flat picker entry (groupExamFamilies
    // rule 2); it becomes a real family automatically when ICSE Class 10 lands.
  },
  {
    slug: "mh-sb-9",
    tier: "school",
    displayName: "MH State Board 9",
    examName: "Maharashtra State Board Class 9", // must match the `exams` DB row exactly
    mixedFormats: true, // 1,176 subjective vs 111 MCQ
    guidesPath: null, // no /guide subtree yet — falls back to the index
    notesPath: "/notes/mh-sb-9", // exam hub: "coming soon" until notes ship
    practiceOnly: true, // Balbharati textbook exercises/solved-examples corpus (9th is not a board year → no PYQs) → /browse defaults to Practice
    boardExam: true, // textbook content → gets the /board reader + the "Board" nav tab
    board: "Maharashtra State Board",
    std: 9,
  },
  {
    slug: "mh-sb-11",
    tier: "senior",
    displayName: "MH State Board 11",
    examName: "Maharashtra State Board Class 11", // must match the `exams` DB row exactly
    mixedFormats: true, // 2,738 subjective vs 203 MCQ
    guidesPath: null, // no /guide subtree yet — falls back to the index
    notesPath: "/notes/mh-sb-11", // exam hub: "coming soon" until notes ship
    practiceOnly: true, // Balbharati textbook exercises/solved-examples corpus (11th is not a board year → no PYQs) → /browse defaults to Practice
    boardExam: true, // textbook content → gets the /board reader + the "Board" nav tab
    board: "Maharashtra State Board",
    std: 11,
  },
  {
    slug: "mh-ssc-10",
    tier: "school",
    displayName: "MH SSC 10",
    examName: "Maharashtra State Board Class 10", // must match the `exams` DB row exactly
    classLabel: "Class 10 (SSC)", // grouped pickers: SSC is what Maharashtra students say
    mixedFormats: true, // 1,390 subjective vs 245 MCQ
    guidesPath: null, // no /guide subtree yet — falls back to the index
    notesPath: "/notes/mh-ssc-10", // exam hub: "coming soon" until notes ship
    // NOT practiceOnly: Class 10 IS a board year → these are real past-year board
    // papers (question_kind='pyq'), so /browse defaults to the PYQ view.
    boardExam: true, // FLIPPED 2026-09-03. This read false with the comment "PYQ
    // papers aren't textbook-structured, so they live on /browse, not the
    // book-faithful /board reader" — true of the PYQ corpus, and stale from
    // 2026-08-28, when the Balbharati TEXTBOOK layer landed (scripts/mh-ssc-10-text,
    // question_kind='practice'). That layer is 56 chapters / 1,766 questions, every
    // row carrying section_seq and passing board:lint, i.e. fully built for this
    // reader and unreachable behind a 404 for six days. Same shape as mh-hsc-12,
    // which likewise carries both corpora and has always been a board exam: the
    // flag tracks whether an exam has a TEXTBOOK-structured corpus, not whether it
    // also has PYQs. /browse keeps its PYQ default; the two axes are orthogonal.
    board: "Maharashtra State Board",
    std: 10,
  },
  {
    slug: "worksheets-11-12",
    tier: "senior",
    displayName: "Worksheets 11+12",
    examName: "Worksheets - 11th+12th", // must match the `exams` DB row exactly
    guidesPath: null, // no /guide subtree — falls back to the index
    notesPath: "/notes/worksheets-11-12", // exam hub: "coming soon" until notes ship
    practiceOnly: true, // Cadetprep concept-practice worksheets → /browse defaults to Practice
    // NOT boardExam: worksheet content isn't textbook-sectioned, so no /board reader.
  },
  // ── IPMAT ─────────────────────────────────────────────────────────────────
  // Three separate `exams` rows grouped into ONE picker entry, exactly as CBSE
  // is cbse-10/11/12 — the DB half of that pattern shipped with the ingest, and
  // this is the picker half. They are siblings a student thinks of as one exam
  // but they are neither a board nor a class, which is why they group on
  // `family` rather than `board`+`std`.
  //
  // LIVE since 2026-09-24 — all 1,419 rows are PUBLIC. The keys are afterboards'
  // third-party derivation (IIM publishes none), measured at 124 rows blind-scored
  // across all three subjects with 0 wrong keys, rate bounded under ~2.4% at 95%:
  // scripts/ipmat/data/derive/KEY_TRUST.md. Every row carries a `derived_model`
  // stamp recording that provenance, which scripts/ipmat/flip-public.ts refuses to
  // publish without.
  //
  // Order here is the order students see: Indore is the flagship.
  {
    slug: "ipmat-indore",
    tier: "senior",
    displayName: "IPMAT Indore",
    examName: "IPMAT Indore", // must match the `exams` DB row exactly
    family: "IPMAT",
    familyLabel: "Indore",
    familyAxis: "Institute", // the picker chooses between IIMs, not classes
    guidesPath: null, // no /guide subtree yet — falls back to the index
    notesPath: null, // no notes yet — falls back to the /notes index
    // NOT practiceOnly: this is a real past-year corpus (question_kind='pyq').
    // NOT boardExam: an entrance exam with no textbook layer.
    mixedFormats: true, // SET AT THE FLIP FROM A LIVE COUNT (2026-09-24): 522 mcq
    // + 148 numeric (the Short Answer section), all now PUBLIC. Deliberately not
    // set earlier from the PAPERS — the flag describes the PUBLIC corpus, and
    // setting it while that corpus was empty is what failed the contract suite on
    // the isc-12 entry.
  },
  {
    slug: "ipmat-rohtak",
    tier: "senior",
    displayName: "IPMAT Rohtak",
    examName: "IPMAT Rohtak", // must match the `exams` DB row exactly
    family: "IPMAT",
    familyLabel: "Rohtak",
    familyAxis: "Institute", // the picker chooses between IIMs, not classes
    // NO mixedFormats: measured at the flip — all 172 PUBLIC rows are mcq.
    guidesPath: null,
    notesPath: null,
  },
  {
    slug: "jipmat",
    tier: "senior",
    displayName: "JIPMAT",
    // The exam is "JIPMAT", not "IPMAT Jammu" — the joint Bodh Gaya/Jammu paper
    // has its own name, and the `exams` row uses it. Only its label INSIDE the
    // family is "Jammu", so the picker reads Indore / Rohtak / Jammu.
    examName: "JIPMAT", // must match the `exams` DB row exactly
    family: "IPMAT",
    familyLabel: "Jammu",
    familyAxis: "Institute", // the picker chooses between IIMs, not classes
    // NO mixedFormats: measured at the flip — all 577 PUBLIC rows are mcq.
    guidesPath: null,
    notesPath: null,
  },
] as const;

export const DEFAULT_EXAM_SLUG: ExamSlug = "nda";

const SLUG_SET = new Set<string>(EXAM_REGISTRY.map((e) => e.slug));

export function isExamSlug(value: unknown): value is ExamSlug {
  return typeof value === "string" && SLUG_SET.has(value);
}

export function getExamBySlug(slug: string | null | undefined): ExamEntry | null {
  if (!slug) return null;
  return EXAM_REGISTRY.find((e) => e.slug === slug) ?? null;
}

/**
 * Registry entry by its `exams` DB name. The inverse join to `getExamIdMap`,
 * which resolves the same pair the other way — needed because the /browse
 * filter list comes from the DB (`listExams`) and carries names, not slugs.
 *
 * Null for a DB exam with no registry entry, which callers must treat as
 * "ungrouped", never as "drop it" — see groupExamFamilies.
 */
export function getExamByName(examName: string | null | undefined): ExamEntry | null {
  if (!examName) return null;
  return EXAM_REGISTRY.find((e) => e.examName === examName) ?? null;
}

/** True when an exam (by its DB name) has a practice-only corpus and should
 *  default the `/browse` kind filter to "practice" rather than "pyq". */
export function isPracticeOnlyExam(examName: string | null | undefined): boolean {
  if (!examName) return false;
  return EXAM_REGISTRY.some((e) => e.examName === examName && e.practiceOnly === true);
}

/**
 * Bank tab href. When the user has picked an exam, the link applies the
 * `examId` filter directly. Without an exam UUID, links to the bare bank.
 */
export function resolveBankHref(examUuid: string | null | undefined): string {
  if (!examUuid) return "/browse";
  const sp = new URLSearchParams();
  sp.set("examId", examUuid);
  return `/browse?${sp.toString()}`;
}

/** Guides tab href. Falls back to `/guide` when the exam has no subtree. */
export function resolveGuidesHref(slug: string | null | undefined): string {
  const exam = getExamBySlug(slug ?? null);
  return exam?.guidesPath ?? "/guide";
}

/** Notes tab href. Falls back to `/notes` when the exam has no subtree. */
export function resolveNotesHref(slug: string | null | undefined): string {
  const exam = getExamBySlug(slug ?? null);
  return exam?.notesPath ?? "/notes";
}

/** True when the active exam is a school board (gets the `/board` reader + tab). */
export function isBoardExam(slug: string | null | undefined): boolean {
  return getExamBySlug(slug ?? null)?.boardExam === true;
}

/** True when the active exam has published mock tests (gates the "Mocks" tab). */
export function examHasMocks(slug: string | null | undefined): boolean {
  return getExamBySlug(slug ?? null)?.hasMocks === true;
}

/** The board exams, in registry order (drives the `/board` index). */
export const BOARD_EXAMS: readonly ExamEntry[] = EXAM_REGISTRY.filter(
  (e) => e.boardExam === true
);

/**
 * Distinct boards, in registry order — the written-paper builder's first
 * dropdown. Derived, so registering a new board exam surfaces it automatically.
 */
export const BOARDS: readonly Board[] = Array.from(
  new Set(EXAM_REGISTRY.map((e) => e.board).filter((b): b is Board => Boolean(b)))
);

/**
 * The classes a board actually has content for, ascending. Deliberately derived
 * from the registry rather than hard-coded 9..12, so the Std dropdown can only
 * ever offer a class the bank can fill — CBSE returns [11, 12] because there is
 * no CBSE 9/10 corpus, and offering either would produce an empty paper.
 */
export function stdsForBoard(board: string | null | undefined): Std[] {
  if (!board) return [];
  return EXAM_REGISTRY.filter((e) => e.board === board)
    .map((e) => e.std!)
    .sort((a, b) => a - b);
}

/**
 * Resolve a (board, std) pair to its exam — the inverse of the conflation in the
 * `exams` table. Null when the pair has no corpus (today: CBSE 9/10 only).
 */
export function getExamForBoardStd(
  board: string | null | undefined,
  std: number | null | undefined
): ExamEntry | null {
  if (!board || !std) return null;
  return EXAM_REGISTRY.find((e) => e.board === board && e.std === std) ?? null;
}

/** Board tab href — the exam's board hub when it's a board exam, else the index. */
export function resolveBoardHref(slug: string | null | undefined): string {
  const exam = getExamBySlug(slug ?? null);
  return exam?.boardExam ? `/board/${exam.slug}` : "/board";
}

export type ActiveTab =
  | "bank"
  | "guides"
  | "notes"
  | "board"
  | "papers"
  | "mock"
  | "books"
  | "blog"
  | "about";

/**
 * Maps a pathname to the primary-nav tab that owns it. Returns null for
 * routes outside the primary surfaces (bare dashboard, login, edit pages).
 *
 * Match is on path segments — `/browser-other` is not a `/browse` match.
 * `/dashboard/papers` is the collaborative paper builder (the Papers tab,
 * org-members only); bare `/dashboard` is admin tooling and owns no tab.
 */
export function getActiveTab(pathname: string): ActiveTab | null {
  const path = pathname.split("?")[0].split("#")[0];
  if (matchesSegment(path, "/browse")) return "bank";
  if (matchesSegment(path, "/guide")) return "guides";
  if (matchesSegment(path, "/notes")) return "notes";
  if (matchesSegment(path, "/board")) return "board";
  if (matchesSegment(path, "/mock")) return "mock";
  if (matchesSegment(path, "/dashboard/papers")) return "papers";
  // Books — the superadmin PYQ-master-book reader. Its tab is drawn only for a
  // superadmin, but the mapping is unconditional: whoever can reach the route
  // should see which tab owns it.
  if (matchesSegment(path, "/books")) return "books";
  // Blog — public editorial. Unlike Books this owns no role gate; the tab is
  // drawn for everyone from sm up, and below sm it lives in the account menu
  // (see UserMenu) because the phone tab bar is a fixed five.
  if (matchesSegment(path, "/blog")) return "blog";
  // About — public, and the only tab that is an identity page rather than a
  // product surface. It owns a tab because "who is behind this?" is the
  // question the page exists to answer, and a Footer link alone was where
  // nobody looked.
  if (matchesSegment(path, "/about")) return "about";
  return null;
}

function matchesSegment(path: string, prefix: string): boolean {
  if (path === prefix) return true;
  if (path.startsWith(`${prefix}/`)) return true;
  return false;
}
