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
  /** Notes subtopic/concept slugs for the tagged Excel's SubtopicSlug/ConceptSlug
   *  columns (nda-tracker builds slug-precise /go remediation links from them).
   *  Only meaningful when a record MIRRORS an existing bank row that already carries
   *  a `question_concept_tags` row — i.e. an all-duplicate paper built from the bank.
   *  NEVER author these by hand for net-new practice questions: concept tags are a
   *  PYQ-only axis (see CLAUDE.md "Design axes"), and inventing one here would put a
   *  slug in the sheet that no question_concept_tags row backs. Absent => "" columns,
   *  which is what every hand-transcribed paper emits. */
  subtopicSlug?: string;
  conceptSlug?: string;
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
  // LWS "NDA GAT MOCK" reprint of the REAL **NDA 2024 (II) Paper II — General Ability
  // Test** (150 q: Part A English Q1-50, Part B general ability Q51-150). Source PDF
  // `NDA_2_2024_GAT_Q67_Q72_CORRECTED.pdf` — a born-digital reprint whose filename
  // records that the five picture-option items around Q67-Q72 were corrected.
  //
  // **ALL 150 QUESTIONS ARE `status:"dup"` AND THIS PAPER IS `bankAdd:false`.** This is
  // not a hand transcription at all: the whole sitting is ALREADY in the bank as PUBLIC
  // NDA PYQs, and the mock `nda-2024-sep-gat` holds them as an ordered 150-question
  // snapshot. So the records were MIRRORED from those bank rows (stem, printed option
  // order, official key, stored solution, subject/chapter/subtopic, difficulty, passage
  // context, concept-tag slugs) rather than re-derived — per the lws-test-ingest
  // "all/mostly duplicate" branch, which exists precisely to stop a second, divergent
  // copy of an existing paper being authored. Committing them would duplicate ~150 PYQs
  // as practice rows, so `bankAdd:false`: `build-tags` emits the OMR sheet,
  // `commit-paper` refuses. If a /dashboard/papers copy is ever wanted, build it from
  // the EXISTING PYQ ids — do not flip this flag.
  //
  // Order + option-order VERIFIED against the printed PDF's text layer, not assumed:
  // all 150 stems matched position-for-position (Q17's "We saw" scores 0 only because
  // it has no word over 3 letters), and every printed option block that the text layer
  // exposes — 146 of 150 — matched the bank's A/B/C/D order. The 4 unchecked (Q67, Q69,
  // Q70, Q71) are exactly the items whose printed OPTIONS ARE PICTURES, so there is no
  // option text to compare; the bank rows already carry word-descriptions of each figure
  // in the stem and label the options "Option (a)".."Option (d)" / "Graph (a)"..,
  // which is the only representable form in a text-only OMR sheet. Q149's options differ
  // only as "Yudh Abhyas" vs "YudhAbhyas" (spacing, same option, same position).
  //
  // Subject split (from the bank's own filing): English 50 · Physics 25 · Geography 20 ·
  // Chemistry 15 · History 12 · Biology 10 · Current Affairs 10 · Polity 6 · Economics 2.
  // 70 of the 150 carry `question_concept_tags`, mirrored into subtopicSlug/conceptSlug
  // so nda-tracker can build slug-precise /go remediation links; the other 80 emit "".
  "nda-2024-ii-gat": {
    slug: "nda-2024-ii-gat",
    title: "NDA GAT Mock — NDA 2024 (II) Paper II (General Ability Test)",
    recordsFile: "nda-2024-ii-gat.records.json",
    outName: "NDA_2024_II_GAT_Tags",
    sourceFile: "NDA_2_2024_GAT_Q67_Q72_CORRECTED.pdf",
    subjects: {
      "Biology": {
        "Biodiversity and Classification": [
          "Animal Kingdom Classification",
        ],
        "Cell Biology": [
          "Cell Organelles and Functions",
          "Cellular Respiration and ATP",
        ],
        "Human Physiology": [
          "Connective and Epithelial Tissues",
          "Excretory and Reproductive Anatomy",
          "Nutrition, Vitamins and Minerals",
        ],
        "Plant Biology": [
          "Vegetative Propagation",
        ],
      },
      "Chemistry": {
        "Atomic Structure and Periodic Classification": [
          "Atomic Number, Mass Number and Subatomic Particles",
          "Electron Configuration and Valence Shells",
          "Periodic Trends, Valency and Atomicity",
        ],
        "Carbon and Its Compounds": [
          "Allotropes of Carbon",
        ],
        "Chemical Bonding": [
          "Valency, Oxidation States and Molecular Formula",
        ],
        "Chemical Reactions": [
          "Physical vs Chemical Changes",
          "Redox: Oxidation, Reduction and Reducing Agents",
          "Thermal and Photochemical Decomposition",
        ],
        "Hydrogen and Water": [
          "Properties and Anomalous Behaviour of Water",
        ],
        "Industrial and Applied Chemistry": [
          "Fertilizers",
          "Paints and Coatings",
        ],
        "Matter and Its States": [
          "Separation Techniques",
          "States of Matter, Phase Changes and Diffusion",
        ],
        "Mole Concept and Stoichiometry": [
          "Mole Concept, Avogadro's Law and Molar Calculations",
        ],
      },
      "Current Affairs": {
        "Awards, Honours, Books and Culture": [
          "UNESCO Recognitions and Cultural Heritage",
        ],
        "Defence and Military Exercises": [
          "Military Exercises — Bilateral and Multilateral",
        ],
        "Government Schemes, Policy and Governance": [
          "Health, Education and Welfare Schemes",
        ],
        "International Affairs and Relations": [
          "India's Foreign Policy and Bilateral Relations",
          "International Organizations and Multilateral Bodies",
          "International Summits, Initiatives and Forums",
        ],
        "National Events, Persons and India General Knowledge": [
          "National Days, Festivals and Observances",
        ],
      },
      "Economics": {
        "Indian Economy": [
          "Five Year Plans and Indian Planning",
        ],
      },
      "English": {
        "Cloze Test": [
          "Word Selection in Passage",
        ],
        "Grammar": [
          "Parts of Speech",
          "Sentence Completion",
        ],
        "Idioms and Phrases": [
          "Idiom Meaning",
        ],
        "Reading Comprehension": [
          "Literal Comprehension",
        ],
        "Sentence Rearrangement": [
          "Sentence Part Rearrangement (PQRS)",
        ],
        "Vocabulary": [
          "Antonyms",
          "Synonyms",
        ],
      },
      "Geography": {
        "Climatology, Atmosphere and Weather": [
          "Atmospheric Pressure and Winds",
          "Cyclones, Fronts and Local Winds",
        ],
        "Earth in Space, Maps and Coordinates": [
          "Earth's Shape, Rotation and Motion",
        ],
        "Earth's Structure, Landforms and Geological Time": [
          "Landforms and Mass Movements",
          "Rocks, Minerals and Geological Time",
          "Weathering and Denudation",
        ],
        "Indian Geography — Economy, Resources and Transport": [
          "Agriculture, Crops, Soils and Land Use",
          "Energy and Industries — Power, Petroleum, Iron and Steel",
        ],
        "Indian Geography — Physical Features": [
          "Indian Rivers, Lakes and Water Bodies",
          "Indian Soils and Climate-Agriculture",
          "Indian States and Islands",
          "Mountains, Plateaus and Plains of India",
        ],
        "Oceanography": [
          "Ocean Currents",
        ],
        "World and Human Geography": [
          "World — Rivers, Canals and Water Bodies",
        ],
      },
      "History": {
        "Ancient India": [
          "Mahajanapadas, Magadha and Mauryan Empire",
        ],
        "Medieval India": [
          "Medieval Travellers, Trade and Crops",
          "Vijayanagara Empire",
        ],
        "Modern India": [
          "British Administration, Acts and Legislation",
          "British Economic Policy and Industrial India",
          "Freedom Movement — INC, Gandhi and Independence",
          "Post-Independence India",
        ],
        "World History": [
          "Industrial Revolution",
        ],
      },
      "Physics": {
        "Electricity and Magnetism": [
          "Cells, EMF and Kirchhoff's Laws",
          "Combination of Resistors",
          "Electric Current and Ohm's Law",
          "Electrical Power, Energy and Heating",
          "Electrostatics",
        ],
        "Fluid Mechanics and Properties of Matter": [
          "Buoyancy, Density and Flotation",
        ],
        "Gravitation": [
          "Gravitational Field and Potential",
          "Newton's Law of Gravitation",
        ],
        "Heat and Thermodynamics": [
          "Heat, Calorimetry and Specific Heat",
          "Phase Change and Boiling",
        ],
        "Kinematics and Motion": [
          "Equations of Motion and Graphs",
          "Vectors and Position",
        ],
        "Laws of Motion and Forces": [
          "Newton's Laws of Motion",
          "Types of Forces",
        ],
        "Light and Optics": [
          "Human Eye and Optical Instruments",
          "Lenses and Lens Formula",
          "Reflection and Mirrors",
        ],
        "Work, Energy and Power": [
          "Energy and Conservation",
          "Simple Machines",
          "Work-Energy Theorem and Power",
        ],
      },
      "Polity": {
        "Fundamental Rights, DPSP and Local Governance": [
          "Fundamental Rights, DPSP and Duties",
        ],
        "Government Structure — Parliament, Judiciary and Constitutional Bodies": [
          "Constitutional Bodies and Offices",
          "Parliament — Composition, Procedures and Powers",
        ],
        "Indian Constitution — Making, Foundation and Amendments": [
          "Features, Parts and Schedules of Constitution",
        ],
        "World Polity, Democracy and International Relations": [
          "India's Foreign Policy — Panchsheel",
        ],
      },
    },
    pyqNote: "NDA 2024 (II) Paper II (GAT) — printed as an LWS GAT Mock. Bank-mirrored: every question already exists as an NDA PYQ.",
    examName: "NDA",
    section: { key: "nda-2024-ii-gat", label: "NDA 2024 (II) — GAT" },
    bankAdd: false, // Excel-only: all 150 are existing PUBLIC PYQs, never re-commit as practice.
  },

  // LWS "NDA GAT MOCK G1 LWS FINAL" — 150-q NDA GAT MOCK in two printed parts: Part A is
  // English (Q1–50: antonyms Q1–10, PQRS ordering Q11–20, synonyms Q21–30, prepositions
  // Q31–40, spotting errors Q41–50) and Part B is general ability (Q51–150). Part B is
  // SUBJECT-INTERLEAVED rather than blocked — history, current affairs and geography
  // alternate question by question through Q51–100 — so `subject` is assigned PER RECORD
  // by content. Final split: English 50 · Physics 31 · History 22 · Chemistry 17 ·
  // Current Affairs 14 · Geography 12 · Biology 3 · Polity 1. NO printed key: all 150
  // answers DERIVED.
  //
  // Born-digital .docx, but UNLIKE the sibling W1 paper it embeds **33 images across 20
  // questions**. The coordinator read all 33 and wrote a transcription table the agents
  // worked from, so no agent had to interpret a picture. Most are benign — inline math
  // (`m_1`, `V/\sqrt2`) or whole option blocks of chemical formulae, all of which
  // transcribe to LaTeX. Only six are true diagrams (a lens pair Q108, a two-segment
  // cylinder Q115, an RC circuit Q140, a generator circuit Q146, an Atwood pulley Q149);
  // those are described IN WORDS inside the stem, because the tagged Excel is text-only.
  //
  // Semantic dedup vs the live NDA bank — run BEFORE any answer derivation, and against a
  // bank that ALREADY CONTAINED the 145 W1 rows ingested the same day: 89 new / 54 dup /
  // 7 flawed. The two halves behave completely differently and that is the headline
  // finding: **all 50 English questions are duplicates** (Q1–25 matched bank rows verbatim,
  // same stems AND same printed option order; Q26–50 likewise), i.e. Part A is assembled
  // wholesale from NDA PYQs already in the bank, while Part B is largely net-new (Q51–80
  // 29 new, Q111–130 18 new, Q131–150 17 new). So this paper's bank contribution is the
  // science/GK half only.
  //
  // 7 rows HELD PRIVATE as status:"flawed" (each keyed for OMR parity, none PUBLIC):
  //   Q42  — prints only THREE labelled parts where every sibling item prints four, so no
  //          fourth option exists. Key B is unaffected (the faulty "to meet" is part (b)).
  //   Q91  — the source carries the stem and BOTH numbered statements but **no option block
  //          at all**; verified it did not leak into Q90 or Q92, which are both complete.
  //          The standard statement-code block was RECONSTRUCTED (not transcribed) and the
  //          answer derived independently (statement 1 true, statement 2 false ⇒ "1 only").
  //          **Needs a check against the printed paper** — if its options ran in a different
  //          order the letter moves.
  //   Q106 — option (c) prints as the bare digit "2", the element symbol missing. Keyed B
  //          (\(\text{O}_2\), the largest legible molar mass ⇒ fewest moles ⇒ least volume).
  //   Q109 — the stem says "circuit as shown above" but there is NO figure anywhere in the
  //          document and none in the image inventory, so the topology is unreadable. Keyed
  //          A as the only value landing on a printed option; explicitly NOT verified.
  //   Q113 — the four options ARE GRAPHS, unrepresentable in a text-only sheet. The plots
  //          are described in words; the physics is unambiguous (\(E = P^2/2m\)) so the key
  //          B is safe.
  //   Q124 — the stem breaks off mid-sentence ("...has produced ␣ what is formula"), the ion
  //          species missing entirely. Ions reconstructed as the only pair consistent with
  //          the printed option set.
  //   Q134 — options (c) and (d) are printed IDENTICALLY as \([ML^2T^{-2}]\). The key is
  //          nonetheless safe: latent heat is energy PER UNIT MASS, so the answer is (a)
  //          \([M^0L^2T^{-2}]\) and is not part of the duplicated pair.
  //
  // OFFICIAL KEY CROSS-CHECK (the LWS key arrived separately as a CSV covering all 150, AFTER
  // every answer had been derived): **137/150 AGREE after reconciliation, 13 HELD**. That is a
  // far worse key than the sibling W1 paper (147/150 before reconciliation, 149 after), and the
  // holds are NOT close calls — most are checkable facts. THREE divergences were adopted TO the
  // official key:
  //   Q31  A -> B  adopted, and it exposed a SECOND wrong bank key: the item duplicates bank row
  //                89d48348 (keyed A, "increase OF greenhouse gases"). The official B is right —
  //                the sentence's own second clause reads "the increase IN temperature". Bank row
  //                logged as a backfill candidate.
  //   Q98  D -> B  adopted. The stem asks which STATEMENTS are correct, not which one is the
  //                operative mechanism; "radio waves have a very long wavelength" is simply true.
  //   Q106 B -> C  adopted, and the key DECODES the printed defect: option (c) lost its element
  //                symbol and prints as a bare "2". For (c) to be correct it must be heavier than
  //                \(\text{O}_2\), which points to \(\text{CO}_2\) (44 g/mol, the least volume).
  //                Key set to C; the option TEXT is left exactly as printed, not reconstructed.
  // The other THIRTEEN are held against the official key, each on specific evidence:
  //   Q73  — DECISIVE: the official key CONTRADICTS ITSELF. Q63 and Q73 are the SAME assertion-
  //          reason item printed twice with identical options, and the key marks Q63 = D (which
  //          we match) but Q73 = A. Held at D on the teacher's own Q63 ruling.
  //   Q74  — this is verbatim **UPSC Prelims 2012**, whose official answer is (b): the Congress
  //          kept social reform out of its deliberations, so Ranade's National Social Conference
  //          was formed as a separate body. Official key says D ("none of the above").
  //   Q59  — the Sanskrit College at Benaras (1791) was founded by Jonathan Duncan, NOT William
  //          Jones, so pair 1 is wrong and only pair 2 stands. Official key says 1 and 2.
  //   Q65  — Wood's Despatch DID recommend the three universities (statement 2 true) and did NOT
  //          prescribe English at all levels (statement 3 false — vernaculars at the lower
  //          stages). Official key inverts both.
  //   Q68  — the technical consultant for the Chennai–Port Blair submarine OFC was TCIL, not
  //          TRAI, which is the sector regulator; statement 4 is false. Official key says all four.
  //   Q75  — the Hindu Succession Act does not apply to Christians, Parsis or Jews, so "applies to
  //          everyone who is not a Muslim" is false as printed. Official key treats it as true.
  //   Q78  — the RBI's K.V. Kamath committee (6 Aug 2020) recommended parameters for resolving
  //          COVID-19 STRESSED LOANS of corporate borrowers, not MSME sectors.
  //   Q90  — the NITI Aayog report recorded a DECLINE in the sex ratio at birth (906 to 900, down
  //          in 17 of 21 large states), so "no change" is false. Official key treats it as true.
  //   Q108 — two convex lenses separated by \(f_1 + f_2\) are exactly the Keplerian telescope:
  //          parallel in, parallel out. Both statements are true. Official key says neither is.
  //   Q115 — two equal rods in series give \(R = (P_1+P_2)l/A\) over a total length \(2l\), so the
  //          effective resistivity is \((P_1+P_2)/2\). Official key says \(P_1+P_2\).
  //   Q120 — specific gravity is a dimensionless ratio of densities and \(g\) cancels in the
  //          flotation condition, so a hydrometer reads the SAME at altitude.
  //   Q138 — a telephone repeater restores an attenuated signal, i.e. it is an amplifier; an
  //          oscillator generates a signal rather than boosting one.
  //   Q82  — the one genuine toss-up, and the only hold NOT asserted as a key error: it duplicates
  //          bank row c882e763 (keyed C, both statements true) while the official key says B. The
  //          claim turns on a source-specific reading of Dayanand's varna-by-merit position.
  //          Left at the bank's C and flagged as contested rather than adjudicated.
  //
  // ONE KEY DELIBERATELY MOVED AWAY FROM ITS MATCHED BANK ROW — Q20 duplicates bank row
  // 7b7e248f-6a08-4fdc-bf82-a102c862b175, which is keyed A (PRSQ). That bank key is WRONG:
  // only RSQP reassembles a grammatical sentence ("Instead of worrying about what you cannot
  // control, shift your energy to what you can create"), while PRSQ strands the opening
  // prepositional phrase. The bank row's own stored solution never evaluates option D and
  // settles on A as a "best fit". Keyed D here so the OMR cannot mark correct students wrong;
  // **the bank row itself is left untouched and logged as a backfill candidate** for a
  // separate, permissioned key review.
  //
  // Other flags carried in reviewNote: Q56 (Muslims and the Extremists) is genuinely
  // interpretive; Q81's Agriculture Infrastructure Fund was launched by the PM, not the
  // Agriculture Minister, so the key turns on a loose vs strict reading; Q122 (gold vs
  // copper, both occur native); Q9's printed "Imperiousness" is almost certainly a
  // corruption of the bank row's "Imperviousness"; Q131's codes grid extracted TRANSPOSED
  // and was read row-wise (the only reading giving one-to-one pairings); Q144's option (c)
  // `CaSiO_4` is charge-unbalanced and was read as a dropped-subscript misprint; and Q146's
  // fourth option is printed with a duplicated "(b)" label. The paper also contains a real
  // factual error the agents caught: Q80 asserts Mount Sinabung is on Java (it is on
  // SUMATRA) and dates its post-dormancy eruption to 2013 (it was 2010).
  // LWS "NDA GAT W2" — 150-q NDA GAT weekly mock spanning SIX subjects: English (Q1–50),
  // Biology (Q51–80), Geography (Q81–110 + Q146), Current Affairs (Q111–125 + Q150),
  // Chemistry (Q126–145 + Q148) and Physics (Q147, Q149). Born-digital .docx, no images at
  // all, so stems and options came straight from pandoc — no vision pass.
  //
  // UNLIKE W09, this paper ships a COMPLETE printed answer key (a separate
  // "NDA GAT W2 Answer Key.docx", all 150). The key was still treated as a PEER, not an
  // oracle: all 122 non-duplicate answers were re-derived BLIND (agents never saw the key)
  // and adjudicated against it — 110 AGREE / 9 agree-but-hedged / 3 DISAGREE. Separately,
  // the 28 duplicate rows gave a free second check, since the bank already stores their
  // answers: 27 of 28 matched (the 28th, Q3, is "robust" vs the bank's "sturdy" — synonyms).
  //
  // Semantic dedup vs the 3,311-row NDA GAT bank, run BEFORE any answer work: 28 DUP /
  // 48 MAYBE / 74 NEW. MAYBE is kept as "new" per the standing precedent. The English half
  // is heavily recycled — Q16–25, Q31–40 and the WHOLE Q41–45 Garrett reading-comprehension
  // set are verbatim bank rows (Jaccard 1.00, identical options and answers). Vocabulary is
  // genuinely new: all 24 headwords return zero bank hits. Note Q71 was demoted DUP→MAYBE on
  // inspection — its bank twin is a 4-stage sequence, this is a 5-stage one.
  //
  // Three source defects recorded rather than repaired, none affecting its key: Q70 labels
  // two options "(c)" and prints no "(d)" (fourth text "vas deferens" restored; separately
  // "Leydig cell" and "interstitial cells" are the same cell, so it offers three real
  // choices); Q51's "Filariasis" and "Eliphantiasis" (sic) are one disease; Q143's number is
  // glued to the tail of Q142's option (d), which silently costs a naive parse Q143–150.
  // Q144 prints its options as a 2-column table, so they extract in the order a, c, b, d.
  //
  // All THREE disagreements ship on the printed key, on the teacher's explicit call
  // (2026-08-08); each carries a reviewNote recording the argument on both sides.
  //   Q83  continental shelf — the key needs "abrupt falls" read as the shelf's own gradient
  //        (gentle, so the claim is false); read as the shelf BREAK the claim is true and the
  //        answer would be (a). Option (a) is itself broken English ("absent to plate
  //        boundaries"), so both candidate answers depend on repairing a bad sentence.
  //   Q113 IIGF 2025 — turns on whether the printed "intelligence governance" is a deliberate
  //        distortion of the real "internet governance" theme or a typo. Confirmed as the
  //        paper's own wording, not an extraction artefact.
  //   Q128 "acids are good conductors" — defensibly false for weak electrolytes, and fits the
  //        item's design of three definitional traps around one true statement.
  // Net: 0 flawed. 122 new / 28 dup.
  // LWS "GAT FULL MOCK W03" — 150-q NDA GAT weekly mock spanning FIVE subjects, cleanly
  // BLOCKED (unlike G1, which interleaves): English Q1–50, Geography Q51–90, Current
  // Affairs Q91–100, Biology Q101–125, Chemistry Q126–150. Born-digital .docx with NO
  // images at all, so stems and options came straight from pandoc — no vision pass.
  // English breaks down as RC 5 · sentence rearrangement 10 · homonyms 10 · antonyms 3 ·
  // synonyms 2 · sentence improvement 10 · discourse markers 10; Geography as
  // geomorphology Q51–80 + economic/human geography Q81–90.
  //
  // Ships a COMPLETE printed answer key (a separate "GAT FULL MOCK W03 Answer Key.docx",
  // all 150, parsed with no conflicts). As on W2 the key was treated as a PEER, not an
  // oracle: all 150 answers were re-derived BLIND (the key file was physically moved out
  // of the agents' working directory first) and then adjudicated — **147 AGREE / 3
  // DISAGREE, 98.0%**. The 11 duplicate rows gave a free second check on top, since the
  // bank already stores their answers: 7 verbatim dups compared directly and all 7 agreed.
  //
  // Semantic dedup vs the 2,902-row NDA bank across the five subjects, run BEFORE any
  // answer work: 11 DUP / 52 MAYBE / 87 NEW. MAYBE is kept as "new" per the standing
  // precedent. Far more original than W2 (which was 28 DUP): Geography is the freshest
  // section at 1 DUP in 40, and the whole Q82–Q90 economic-geography run returned zero
  // bank hits. An internal-duplicate scan (exact + Jaccard) found NO two questions in the
  // paper colliding, so all 150 insert without a content_hash collision.
  //
  // The three disagreements, all adjudicated with the teacher (2026-08-10):
  //   Q118 PRINTED KEY IS WRONG → ships the DERIVED answer A. The match-list keys option B,
  //        which assigns multiple fission to Kala Azar and binary fission to Plasmodium —
  //        the two are swapped. Leishmania (the Kala Azar parasite) is the textbook binary-
  //        fission organism (this bank already carries "the stages of binary fission in
  //        Leishmania") and Plasmodium the textbook multiple-fission one. Only key error found.
  //   Q85  jhum stages — genuine judgement call with nothing in the bank to settle it. The
  //        key omits harvesting and adds weeding; the derivation argued a cultivation cycle
  //        cannot omit harvesting. Ships on the PRINTED KEY (D), both readings in reviewNote.
  //   Q82  the one FLAWED question (see below) — ships on the printed key for OMR parity.
  //
  // Four source defects recorded rather than repaired:
  //   Q141 has NO STEM AND NO QUESTION NUMBER in the source — verified in the raw
  //        word/document.xml, so not a pandoc artefact; only its four options survive. The
  //        dedup gate found the bank already holds the identical question (96249db5) with
  //        all four options byte-for-byte in the same order, so the stem was RECOVERED from
  //        there rather than invented, and the row ships status:"dup" (PRIVATE).
  //   Q82  prints only THREE options (no "d") and its option (c) uses the numeral "i" twice,
  //        so it is not a valid one-to-one mapping; worse, the true pairing (a-ii, b-iv,
  //        c-iii, d-i) matches NO printed option. status:"flawed" — optD is an explicit
  //        "[No fourth option was printed…]" placeholder, never a fabricated distractor.
  //   Q11  option (b) prints "SQPQ" — Q twice, R missing, not a valid permutation.
  //   Q97  option (d) is truncated mid-way to "a-3,". Neither affects its key.
  // Plus two meaning-level source errors kept verbatim: Q14's sentence R drops a "not"
  // ("liberalisation … will be able to help India"), inverting it, and Q81 dates the Bokaro
  // steel plant to 1864 — read as a deliberate false statement, since the same item also
  // plants "Noamundi" for Kiriburu and a non-existent "Krishna Valley Corporation", and the
  // option set offers "None". Q117's stem carries a stray leftover "75." which WAS dropped.
  // Net: 138 new / 11 dup / 1 flawed.
  "gat-mock-w011": {
    slug: "gat-mock-w011",
    title: "NDA GAT — LWS Mock W011",
    recordsFile: "gat-mock-w011.records.json",
    outName: "Tags_NDA_GAT_Mock_W011",
    sourceFile: "NDA_GAT_MOCK_W011.docx",
    subjects: {
      Biology: {
        "Biodiversity and Classification": ["Animal Kingdom Classification"],
        "Cell Biology": [
          "Cell Division and DNA Replication",
          "Cell Organelles and Functions",
          "Cell Wall and Cell Membrane",
        ],
        "Genetics and Evolution": ["Heredity and DNA"],
        "Human Physiology": [
          "Circulatory and Lymphatic System",
          "Connective and Epithelial Tissues",
        ],
        "Plant Biology": ["Plant Tissues and Meristems"],
      },
      Chemistry: {
        "Acids, Bases and Salts": ["pH Scale and Common Substances"],
        "Atomic Structure and Periodic Classification": [
          "Electron Configuration and Valence Shells",
          "Periodic Trends, Valency and Atomicity",
        ],
        "Chemical Bonding": ["Valency, Oxidation States and Molecular Formula"],
        "Chemical Reactions": [
          "Endothermic and Exothermic Reactions",
          "Redox: Oxidation, Reduction and Reducing Agents",
          "Types of Reactions: Combination, Decomposition, Displacement",
        ],
        "Matter and Its States": [
          "Compounds, Mixtures and Solutions",
          "States of Matter, Phase Changes and Diffusion",
        ],
        "Metals and Non-Metals": ["Reactivity Series and Reactions with Water"],
        "Mole Concept and Stoichiometry": ["Stoichiometry and Laws of Chemical Combination"],
      },
      "Current Affairs": {
        "Awards, Honours, Books and Culture": ["Books, Literature and Authors"],
        "Defence and Military Exercises": ["Military Exercises — Bilateral and Multilateral"],
        "Government Schemes, Policy and Governance": ["Health, Education and Welfare Schemes"],
        "International Affairs and Relations": [
          "International Organizations and Multilateral Bodies",
        ],
        "National Events, Persons and India General Knowledge": [
          "Indian Economy, Geography and Resources",
        ],
        "Science and Technology": ["Information Technology and Railway Safety"],
        Sports: ["Cricket — Records, Tournaments and Players"],
      },
      Economics: {
        "Indian Economy": [
          "Five Year Plans and Indian Planning",
          "International Trade and Finance",
        ],
      },
      English: {
        "Fill in the Blanks": ["Contextual Fill-in-Blank"],
        Grammar: [
          "Active and Passive Voice",
          "Direct and Indirect Speech",
          "Discourse Markers and Connectors",
        ],
        "Reading Comprehension": ["Inferential Comprehension"],
        "Sentence Rearrangement": [
          "Paragraph Sequencing (S1–S6)",
          "Sentence Part Rearrangement (PQRS)",
        ],
        Vocabulary: ["Confusable Word Pairs", "Synonyms", "Word Definition"],
      },
      Geography: {
        "Climatology, Atmosphere and Weather": [
          "Atmospheric Layers, Composition and Aurora",
          "Cyclones, Fronts and Local Winds",
          "Insolation, Temperature and Solar Geometry",
        ],
        "Earth's Structure, Landforms and Geological Time": [
          "Earthquakes and Seismic Waves",
          "Rocks, Minerals and Geological Time",
          "Soils",
          "Volcanoes and Igneous Activity",
        ],
        "Indian Geography — Economy, Resources and Transport": [
          "Agriculture, Crops, Soils and Land Use",
          "Energy and Industries — Power, Petroleum, Iron and Steel",
          "Highways, Railways and Transport Corridors",
          "Minerals and Mining",
          "Ports and Maritime Infrastructure",
        ],
        "Indian Geography — Physical Features": [
          "Forests and Natural Vegetation of India",
          "Indian Rivers, Lakes and Water Bodies",
          "Indian States and Islands",
          "Location, Extent and Frontiers of India",
          "Mountains, Plateaus and Plains of India",
        ],
        Oceanography: ["Ocean Currents", "Ocean Waves and Sea-Floor Topography"],
        "World and Human Geography": [
          "Human Geography — Megacities and Population",
          "World — Rivers, Canals and Water Bodies",
        ],
      },
      History: {
        "Ancient India": [
          "Ancient Indian Literature and Inscriptions",
          "Mahajanapadas, Magadha and Mauryan Empire",
        ],
        "Modern India": [
          "19th Century Social and Religious Reform",
          "British Administration, Acts and Legislation",
        ],
      },
      Physics: {
        "Electricity and Magnetism": ["Magnetic Force and Fleming's Rules"],
        Gravitation: ["Gravitational Field and Potential", "Orbits, Kepler and Escape"],
        "Heat and Thermodynamics": ["Temperature and Thermometry"],
        "Kinematics and Motion": [
          "Circular Motion",
          "Equations of Motion and Graphs",
          "Projectile and Vertical Motion",
        ],
        "Laws of Motion and Forces": [
          "Conservation of Momentum and Collisions",
          "Friction",
          "Impulse and Momentum",
          "Newton's Laws of Motion",
        ],
        "Light and Optics": [
          "Lenses and Lens Formula",
          "Light Phenomena and Spectrum",
          "Reflection and Mirrors",
        ],
        "Units, Measurement and Dimensions": ["Units and Dimensions"],
        "Work, Energy and Power": [
          "Energy and Conservation",
          "Work and Work Done",
          "Work-Energy Theorem and Power",
        ],
      },
      Polity: {
        "Fundamental Rights, DPSP and Local Governance": ["Electoral Systems"],
        "Government Structure — Parliament, Judiciary and Constitutional Bodies": [
          "Government Departments and Schemes",
          "Parliament — Composition, Procedures and Powers",
        ],
      },
    },
    pyqNote: "NDA GAT practice — LWS GAT Mock W011",
    examName: "NDA",
    section: { key: "gat-mock-w011", label: "GAT Mock W011" },
    bankAdd: true,
    // Like W2/W03 (and unlike W1/G1/W09, which are Excel-only) this one DOES get
    // a /dashboard/papers paper — the whole 150-question printed test, dups
    // included, so it reads as the paper the students actually sat.
    createPaper: true,
  },

  "gat-mock-w03": {
    slug: "gat-mock-w03",
    title: "NDA GAT — LWS Full Mock W03",
    recordsFile: "gat-mock-w03.records.json",
    outName: "Tags_NDA_GAT_Mock_W03",
    sourceFile: "GAT_FULL_MOCK_W03.docx",
    subjects: {
      Biology: {
        "Biodiversity and Classification": ["Animal Kingdom Classification"],
        "Cell Biology": ["Cell Division and DNA Replication", "Cell Organelles and Functions"],
        "Ecology and Environment": ["Ecosystems, Biomes and Ecological Interactions"],
        "Genetics and Evolution": ["Heredity and DNA"],
        "Human Physiology": [
          "Circulatory and Lymphatic System", "Digestive System and Enzymes",
          "Endocrine System and Hormones", "Immune System — Antibody Production",
          "Nervous System and Sense Organs",
        ],
        "Microbiology and Disease": ["Pathogens and Diseases"],
        "Plant Biology": [
          "Photosynthesis", "Transpiration, Tropisms and Plant Processes",
          "Vegetative Propagation",
        ],
        Reproduction: ["Animal and Human Reproduction"],
      },
      Chemistry: {
        "Acids, Bases and Salts": ["Acid-Base Theory: Concepts, Oxides and Electrolytes"],
        "Atomic Structure and Periodic Classification": ["Periodic Trends, Valency and Atomicity"],
        "Carbon and Its Compounds": [
          "Allotropes of Carbon", "Catenation, Tetra-valency and Isomerism",
          "Functional Groups and Common Organic Compounds",
        ],
        "Chemical Bonding": ["Ionic and Covalent Bonding"],
        "Chemical Reactions": [
          "Redox: Oxidation, Reduction and Reducing Agents",
          "Specific Reactions: Precipitation, Electrolysis and Daily Life",
        ],
        "Metals and Non-Metals": [
          "Alloys and Their Composition", "Corrosion and Its Prevention",
          "Extraction of Metals and Ores", "Reactivity Series and Reactions with Water",
        ],
      },
      "Current Affairs": {
        "Environment, Ecology and Energy": ["Climate Change and Summits"],
        "Government Schemes, Policy and Governance": ["Infrastructure, Transport and Cultural Schemes"],
        "International Affairs and Relations": [
          "International Summits, Initiatives and Forums",
          "World Leaders, Elections and Global Events",
        ],
        "National Events, Persons and India General Knowledge": [
          "Indian Economy, Geography and Resources",
          "National Days, Festivals and Observances",
          "National Institutions, Milestones and History",
        ],
        "Science and Technology": ["DRDO, Defence and Marine Technology"],
      },
      English: {
        Grammar: ["Discourse Markers and Connectors"],
        "Reading Comprehension": ["Inferential Comprehension", "Literal Comprehension"],
        "Sentence Rearrangement": ["Paragraph Sequencing (S1–S6)"],
        "Spotting Errors": ["Sentence Improvement"],
        Vocabulary: ["Antonyms", "Confusable Word Pairs", "Synonyms"],
      },
      Geography: {
        "Earth's Structure, Landforms and Geological Time": [
          "Earth's Interior, Crust and Plate Tectonics", "Earthquakes and Seismic Waves",
          "Landforms and Mass Movements", "Rocks, Minerals and Geological Time",
          "Volcanoes and Igneous Activity", "Weathering and Denudation",
        ],
        "Indian Geography — Economy, Resources and Transport": [
          "Agriculture, Crops, Soils and Land Use", "Economic Sectors and Government Schemes",
          "Energy and Industries — Power, Petroleum, Iron and Steel", "Minerals and Mining",
        ],
        Oceanography: ["Marine Ecosystems — Coral Reefs", "Ocean Waves and Sea-Floor Topography"],
        "World and Human Geography": [
          "Human Geography — Megacities and Population", "World — Rivers, Canals and Water Bodies",
        ],
      },
    },
    pyqNote: "NDA GAT practice — LWS GAT Full Mock W03",
    examName: "NDA",
    section: { key: "gat-mock-w03", label: "GAT Full Mock W03" },
    bankAdd: true,
    // Like W2 (and unlike W1/G1/W09, which are Excel-only) this one DOES get a
    // /dashboard/papers paper — the whole 150-question printed test, dups included,
    // so it reads as the paper the students actually sat.
    createPaper: true,
  },

  "gat-mock-w2": {
    slug: "gat-mock-w2",
    title: "NDA GAT — LWS Mock W2",
    recordsFile: "gat-mock-w2.records.json",
    outName: "Tags_NDA_GAT_Mock_W2",
    sourceFile: "NDA_GAT_W2.docx",
    subjects: {
      Biology: {
        "Cell Biology": ["Cell Division and DNA Replication"],
        "Human Physiology": [
          "Endocrine System and Hormones", "Excretory and Reproductive Anatomy",
          "Nervous System and Sense Organs",
        ],
        "Microbiology and Disease": ["Pathogens and Diseases"],
        "Plant Biology": [
          "Seed, Fruit and Embryo Development", "Transpiration, Tropisms and Plant Processes",
        ],
        Reproduction: ["Angiosperm Reproduction — Pollination and Fertilization"],
      },
      Chemistry: {
        "Acids, Bases and Salts": [
          "Acid-Base Theory: Concepts, Oxides and Electrolytes",
          "Common Acids: Names, Formulas and Uses", "Salts and Common Compounds",
          "Water of Crystallization", "pH Scale and Common Substances",
        ],
        "Industrial and Applied Chemistry": ["Cement, Glass and Building Materials"],
      },
      "Current Affairs": {
        "Environment, Ecology and Energy": [
          "Climate Change and Summits", "Environmental Campaigns, Disasters and Energy",
        ],
        "Government Schemes, Policy and Governance": [
          "Government Events, Reports and Announcements",
          "Health, Education and Welfare Schemes",
          "Infrastructure, Transport and Cultural Schemes",
        ],
        "International Affairs and Relations": [
          "International Organizations and Multilateral Bodies",
          "International Summits, Initiatives and Forums",
          "World Leaders, Elections and Global Events",
        ],
        "National Events, Persons and India General Knowledge": [
          "Indian Economy, Geography and Resources", "National Days, Festivals and Observances",
          "National Institutions, Milestones and History",
        ],
        "Science and Technology": [
          "Health Technology, Science Awards and Anniversaries", "Nuclear and Renewable Energy",
        ],
      },
      English: {
        "Cloze Test": ["Word Selection in Passage"],
        Grammar: ["Parts of Speech", "Sentence Completion"],
        "Idioms and Phrases": ["Idiom Meaning"],
        "Reading Comprehension": ["Literal Comprehension"],
        "Sentence Rearrangement": ["Sentence Part Rearrangement (PQRS)"],
        Vocabulary: ["Antonyms", "Synonyms"],
      },
      Geography: {
        "Climatology, Atmosphere and Weather": [
          "Cyclones, Fronts and Local Winds", "Insolation, Temperature and Solar Geometry",
        ],
        "Earth in Space, Maps and Coordinates": ["Planets and Solar System"],
        Oceanography: [
          "Marine Ecosystems — Coral Reefs", "Ocean Currents",
          "Ocean Waves and Sea-Floor Topography", "Tides and Ocean Movements",
        ],
        "World and Human Geography": ["World — Rivers, Canals and Water Bodies"],
      },
      Physics: {
        "Modern Physics": ["Nuclear Physics"],
        "Units, Measurement and Dimensions": ["Units and Dimensions"],
      },
    },
    pyqNote: "NDA GAT practice — LWS GAT Mock W2",
    examName: "NDA",
    section: { key: "gat-mock-w2", label: "GAT Mock W2" },
    bankAdd: true,
    // Unlike W1/G1/W09 (Excel-only), this one DOES get a /dashboard/papers paper — the whole
    // 150-question printed test, dups included, so it reads as the paper the students sat.
    createPaper: true,
  },

  "gat-mock-g1": {
    slug: "gat-mock-g1",
    title: "NDA GAT — LWS Mock G1",
    recordsFile: "gat-mock-g1.records.json",
    outName: "Tags_NDA_GAT_Mock_G1",
    sourceFile: "NDA_GAT_MOCK_G1_LWS_FINAL.docx",
    subjects: {
      Biology: {
        "Ecology and Environment": ["Ecosystems, Biomes and Ecological Interactions"],
        "Human Physiology": ["Endocrine System and Hormones"],
        "Plant Biology": ["Plant Tissues and Meristems"],
      },
      Chemistry: {
        "Acids, Bases and Salts": ["Common Acids: Names, Formulas and Uses", "Salts and Common Compounds"],
        "Atomic Structure and Periodic Classification": ["Periodic Trends, Valency and Atomicity"],
        "Chemical Bonding": ["Ionic and Covalent Bonding", "Valency, Oxidation States and Molecular Formula"],
        "Chemical Reactions": ["Redox: Oxidation, Reduction and Reducing Agents"],
        "Hydrogen and Water": ["Properties and Anomalous Behaviour of Water"],
        "Industrial and Applied Chemistry": ["Cement, Glass and Building Materials", "Fertilizers"],
        "Matter and Its States": ["States of Matter, Phase Changes and Diffusion"],
        "Metals and Non-Metals": ["Corrosion and Its Prevention", "Extraction of Metals and Ores"],
        "Mole Concept and Stoichiometry": ["Mole Concept, Avogadro's Law and Molar Calculations"],
      },
      "Current Affairs": {
        "Awards, Honours, Books and Culture": ["Books, Literature and Authors", "Indian Art, Architecture and Cultural Practices"],
        "Environment, Ecology and Energy": ["Environmental Campaigns, Disasters and Energy", "Wildlife Conservation and Species"],
        "Government Schemes, Policy and Governance": [
          "Governance, Policy and Union Territory Reform", "Government Events, Reports and Announcements",
          "Health, Education and Welfare Schemes", "Infrastructure, Transport and Cultural Schemes",
        ],
        "National Events, Persons and India General Knowledge": ["Indian Economy, Geography and Resources"],
        Sports: ["Other Sports and Personalities"],
      },
      English: {
        Grammar: ["Preposition Usage"],
        "Sentence Rearrangement": ["Sentence Part Rearrangement (PQRS)"],
        "Spotting Errors": ["No Error (Correct Sentence)", "Tense and Verb Form", "Word Choice, Prepositions and Punctuation"],
        Vocabulary: ["Antonyms", "Synonyms"],
      },
      Geography: {
        "Climatology, Atmosphere and Weather": [
          "Atmospheric Layers, Composition and Aurora", "Atmospheric Pressure and Winds",
          "Climate Classification and Zones", "Cyclones, Fronts and Local Winds",
          "Insolation, Temperature and Solar Geometry",
        ],
        "Earth's Structure, Landforms and Geological Time": [
          "Earth's Interior, Crust and Plate Tectonics", "Volcanoes and Igneous Activity",
        ],
        Oceanography: ["Ocean Currents"],
        "World and Human Geography": ["World — Coordinates, Time and Place"],
      },
      History: {
        "Modern India": [
          "19th Century Social and Religious Reform", "British Administration, Acts and Legislation",
          "European Trading and Early British Conquest", "Freedom Movement — INC, Gandhi and Independence",
        ],
      },
      Physics: {
        "Electricity and Magnetism": [
          "Combination of Resistors", "Electrical Devices", "Electrical Power, Energy and Heating",
          "Electrostatics", "Magnetism and Magnetic Effects of Current", "Resistance and Resistivity",
        ],
        "Fluid Mechanics and Properties of Matter": ["Buoyancy, Density and Flotation"],
        Gravitation: ["Gravitational Field and Potential", "Newton's Law of Gravitation"],
        "Heat and Thermodynamics": ["Heat, Calorimetry and Specific Heat", "Temperature and Thermometry"],
        "Kinematics and Motion": ["Equations of Motion and Graphs"],
        "Laws of Motion and Forces": ["Newton's Laws of Motion"],
        "Light and Optics": [
          "Lenses and Lens Formula", "Light Phenomena and Spectrum",
          "Prisms and Dispersion", "Refraction, Speed of Light and TIR",
        ],
        "Modern Physics": ["Nuclear Physics"],
        "Oscillations and Waves": ["Simple Harmonic Motion and General Waves", "Simple Pendulum"],
        "Units, Measurement and Dimensions": ["Units and Dimensions"],
        "Work, Energy and Power": ["Energy and Conservation"],
      },
      Polity: {
        "Fundamental Rights, DPSP and Local Governance": ["Fundamental Rights, DPSP and Duties"],
      },
    },
    pyqNote: "NDA GAT practice — LWS GAT Mock G1",
    examName: "NDA",
    section: { key: "gat-mock-g1", label: "GAT Mock G1" },
    bankAdd: true,
    createPaper: false, // Excel is the requested deliverable; no /dashboard/papers paper
  },

  // LWS "NDA GAT MOCK W1" — 150-q NDA GAT weekly MOCK spanning FIVE subjects in clean
  // printed blocks: English (Q1–50), Biology (Q51–90), Current Affairs (Q91–110),
  // Chemistry (Q111–130) and Geography (Q131–150). Born-digital .docx with a clean text
  // layer and ZERO embedded images, so every stem and option came straight from pandoc —
  // no vision pass at all, unusual for an LWS paper. NO printed key: all 150 answers
  // DERIVED by five per-subject agents.
  //
  // English is itself nine printed sub-blocks: an "online shopping" RC passage (Q1–5,
  // shared via context + setLabel "RC1"), phrasal-verb blanks (Q6–15), discourse markers
  // (Q16–20), S1–S6 rearrangement (Q21–25), synonyms (Q26–30), antonyms (Q31–35),
  // spotting errors (Q36–40), sentence improvement (Q41–45) and confusable-word triples
  // (Q46–50). Chemistry is wholly Class-10 chemical reactions; Geography is wholly
  // climatology (air masses and fronts); Biology leans statement-code and match-list
  // shaped rather than the bank's single-fact style.
  //
  // Semantic dedup vs the live NDA bank (English 1,383 / Biology 198 / Current Affairs
  // 192 / Chemistry 308 / Geography 529 rows), run BEFORE any answer derivation:
  // 146 new / 3 dup / 1 flawed — this paper is almost entirely net-new. The 3 dups
  // (answer + solution copied from the matched bank row rather than re-derived) are
  // Q130 (oxidation-reduction reaction ≈ f62b3174), Q141 (troposphere statements ≈
  // f599d030, bank also holds twin 77c5e8fb) and Q150 (latitudinal-zone ordering ≈
  // 99e0ba26, which also fixed its filing under Earth in Space rather than climatology).
  //
  // OFFICIAL KEY CROSS-CHECK (the LWS key arrived separately as a .docx covering all 150,
  // AFTER every answer had been derived): 147/150 AGREE. Two divergences were reconciled
  // TO the official key and ONE is held against it:
  //   Q37  C -> A  adopted. The item has TWO real errors: part (a) misspells "grateful" as
  //                "greatful" (verified present in the source .docx) and part (c)'s "them"
  //                mismatches the singular antecedent "the nation". The derivation picked
  //                the pronoun; the official key marks the spelling. Adopted because it is
  //                the teacher's paper — but ALSO demoted to status:"flawed" and held
  //                PRIVATE, since a student can justify either letter.
  //   Q97  C -> B  adopted. Genuine scheme-vs-branding ambiguity on "ULLAS was launched in
  //                2023": the centrally sponsored New India Literacy Programme runs FY
  //                2022–27 (so the SCHEME launched 2022), while only the ULLAS name, logo
  //                and mobile app were unveiled on 30 July 2023. The key's reading is the
  //                standard one.
  //   Q132 HELD at C against an official key of B — NOT YET TEACHER-CONFIRMED, so treat this
  //                as an open question, not a settled ruling. This is verbatim **NDA-I 2024
  //                Q74**, whose official UPSC option set is (A) 1 only / (B) 1 and 2 only /
  //                (C) 2 and 3 only / (D) 1, 2 and 3, keyed **C = "2 and 3 only"**. This
  //                reprint SCRAMBLED the options and dropped "2 and 3 only" entirely, so the
  //                correct answer is ABSENT. The official key here marks B, which in the
  //                reprint reads "1, 2, 3" — that requires statement 1 to be true, but NCERT
  //                Class 11 states the passage of a front causes ABRUPT (not slow) weather
  //                change, and both the UPSC key and the bank's own copy (e6de738f) exclude
  //                statement 1. So the printed key is provably wrong while our C ("3 only")
  //                wrongly drops the true statement 2: NEITHER letter is correct.
  //                RECOMMENDATION: mark Q132 a bonus / award-to-all rather than grade it.
  //
  // Other flags carried in reviewNote rather than resolved: Q94's printed statement 3 reads
  // "Iraq has recently ratified" the terrorism-financing convention, but the actual recent
  // accession (UN depositary notification CN.639.2025, 29 Oct 2025) was IRAN — the official
  // key CONFIRMS the derived B ("2 only"), i.e. it too treats statement 3 as printed/false;
  // Q39 has TWO defensible errors (the tense in part (b) against the "go to the bed" article
  // slip in part (c) — keyed C, confirmed by the official key); Q14 ("going on in" vs "going
  // through") and Q44 ("had had" vs "no improvement") are genuine two-answer calls, both
  // confirmed by the official key; Q119 turns on the carbonation of slaked lime being
  // exothermic, which NCERT never states outright (confirmed C); and the Current Affairs
  // keys for Q91/Q98/Q99/Q102/Q108 are TIME-SENSITIVE (annual rankings, scheme end-dates,
  // yearly themes) — 14 of the 20 were verified by web search at build time.
  "gat-mock-w1": {
    slug: "gat-mock-w1",
    title: "NDA GAT — LWS Mock W1",
    recordsFile: "gat-mock-w1.records.json",
    outName: "Tags_NDA_GAT_Mock_W1",
    sourceFile: "NDA_GAT_MOCK_W1.docx",
    subjects: {
      Biology: {
        "Biodiversity and Classification": ["Animal Kingdom Classification", "Kingdom Fungi"],
        "Cell Biology": [
          "Cell Division and DNA Replication", "Cell Organelles and Functions",
          "Cell Structure Fundamentals", "Cell Wall and Cell Membrane",
          "Cellular Respiration and ATP", "Prokaryotic vs Eukaryotic Cells",
        ],
        "Ecology and Environment": ["Ecosystems, Biomes and Ecological Interactions"],
        "Human Physiology": [
          "Circulatory and Lymphatic System", "Digestive System and Enzymes",
          "Endocrine System and Hormones", "Excretory and Reproductive Anatomy",
          "Nervous System and Sense Organs", "Respiratory System",
        ],
        "Microbiology and Disease": ["Pathogens and Diseases"],
        "Plant Biology": [
          "Photosynthesis", "Plant Tissues and Meristems",
          "Transpiration, Tropisms and Plant Processes",
        ],
        Reproduction: ["Angiosperm Reproduction — Pollination and Fertilization"],
      },
      Chemistry: {
        "Chemical Reactions": [
          "Endothermic and Exothermic Reactions", "Physical vs Chemical Changes",
          "Redox: Oxidation, Reduction and Reducing Agents",
          "Specific Reactions: Precipitation, Electrolysis and Daily Life",
          "Thermal and Photochemical Decomposition",
          "Types of Reactions: Combination, Decomposition, Displacement",
        ],
        "Metals and Non-Metals": ["Corrosion and Its Prevention"],
        "Mole Concept and Stoichiometry": ["Stoichiometry and Laws of Chemical Combination"],
      },
      "Current Affairs": {
        "Defence and Military Exercises": [
          "Defence Awards, Books and Institutions", "Defence Procurement and Cooperation",
        ],
        "Environment, Ecology and Energy": [
          "Climate Change and Summits", "Environmental Campaigns, Disasters and Energy",
        ],
        "Government Schemes, Policy and Governance": [
          "Health, Education and Welfare Schemes",
          "Infrastructure, Transport and Cultural Schemes",
        ],
        "International Affairs and Relations": [
          "India's Foreign Policy and Bilateral Relations",
          "International Organizations and Multilateral Bodies",
          "International Summits, Initiatives and Forums",
          "World Leaders, Elections and Global Events",
        ],
        "National Events, Persons and India General Knowledge": [
          "National Days, Festivals and Observances",
        ],
        "Science and Technology": ["Space Technology and Astronomy"],
        Sports: ["Other Sports and Personalities"],
      },
      English: {
        "Fill in the Blanks": ["Contextual Word Selection (Phrasal Verbs and Collocations)"],
        Grammar: ["Discourse Markers and Connectors"],
        "Reading Comprehension": ["Literal Comprehension", "Vocabulary in Context"],
        "Sentence Rearrangement": ["Paragraph Sequencing (S1–S6)"],
        "Spotting Errors": [
          "Articles, Determiners and Pronouns", "Sentence Improvement",
          "Tense and Verb Form", "Word Choice, Prepositions and Punctuation",
        ],
        Vocabulary: ["Antonyms", "Confusable Word Pairs", "Synonyms"],
      },
      Geography: {
        "Climatology, Atmosphere and Weather": [
          "Atmospheric Layers, Composition and Aurora", "Atmospheric Pressure and Winds",
          "Climate Classification and Zones", "Cyclones, Fronts and Local Winds",
          "Humidity, Condensation, Clouds and Precipitation",
          "Insolation, Temperature and Solar Geometry",
        ],
        "Earth in Space, Maps and Coordinates": ["Latitude, Longitude and Geographical Grid"],
        Oceanography: ["Ocean Currents"],
      },
    },
    pyqNote: "NDA GAT practice — LWS GAT Mock W1",
    examName: "NDA",
    section: { key: "gat-mock-w1", label: "GAT Mock W1" },
    bankAdd: true,
    createPaper: false, // Excel is the requested deliverable; no /dashboard/papers paper
  },

  // LWS "NDA GAT MOCK W09" — 150-q NDA GAT (General Ability Test) weekly MOCK spanning
  // EIGHT subjects: English (Q1–50), History (Q52–56, 61, 63–68, 70, 116), Polity (Q57,
  // 59, 60, 62, 69), Chemistry (Q71–83, 85), Physics (Q84, 112, 126–150), Geography
  // (Q51, 58, 86–105, 120, 123), Biology (Q106–111, 113–115) and Current Affairs
  // (Q117–119, 121, 122, 124, 125). Born-digital .docx with a clean text layer, so stems
  // and options came straight from pandoc; only three questions carried their content as
  // IMAGES (Q132 speed-of-light options, Q134 equations-of-motion options, and the
  // \(v_1\)/\(v_2\) symbols in the Q132 stem) and were transcribed off the extracted PNGs.
  // NO printed key — all 150 answers DERIVED by per-subject agents and then INDEPENDENTLY
  // re-derived question-by-question during review (full agreement, 0 key changes).
  //
  // Semantic dedup vs the 3,429-row NDA GAT bank (English/History/Geography/Polity/
  // Economics/Chemistry/Physics/Biology/Current Affairs), run BEFORE any answer work:
  // 19 DUP / 38 MAYBE / 93 NEW. MAYBE rows are kept as "new" per the standing precedent
  // (same family, different instance/values/polarity => a genuinely different question),
  // with ONE promoted to "dup": Q30, whose bank twin shares 3 of 4 options AND the answer
  // and is the same reskinned discourse-marker item as the already-dup Q26–Q29. Net:
  // 126 new / 20 dup / 4 flawed. Physics dedup is dominated by "same template, different
  // numbers" MAYBEs (Q127/137/138/148/149/150) — different values, so different answers.
  //
  // 4 rows HELD PRIVATE as status:"flawed" (printed defects; each keyed for OMR grading
  // but kept out of the browsable bank):
  //   Q21  — options (a) and (b) are BOTH "RQSP". The correct sequence is PSRQ, so the
  //          key (D) is unaffected, but the printed option block is broken.
  //   Q94  — the stem calls Anaimudi "the highest peak of Eastern Ghats". It is the
  //          highest peak of the WESTERN Ghats (Kerala); the highest Eastern Ghats peak
  //          is Arma Konda, in Andhra Pradesh — which is ALSO printed as option (a). Keyed
  //          C (where Anaimudi actually is), but the item is ambiguous as printed.
  //   Q131 — asks for a "pure ratio and hence dimensionless" quantity, but none of the
  //          four printed options is dimensionless (density, velocity, Young's modulus,
  //          spring constant). The intended answer (strain) is absent. Keyed C.
  //   Q150 — asks for a VELOCITY but every option is labelled in joules. The value 10 is
  //          correct and unique, so option (d) "10 J" is keyed on its number.
  // Also noted (kept "new"): Q124's option (d) is truncated in the source as "Digital
  // banking infrastructu" -> transcribed as "infrastructure" (key unaffected); Q31 is a
  // genuinely close call between two discourse markers; Q53's standard gana-sangha
  // republics (Vajji/Malla) are absent from the options; Q83's option (d) is also true of
  // a neutral atom; and Q96/Q102/Q117–125 are year-sensitive current-data items (Q102 is
  // additionally ambiguous — ISFR gives Mizoram the top FOREST-cover increase but
  // Chhattisgarh the top FOREST-AND-TREE-cover increase, and both are printed options).
  //
  // OFFICIAL KEY CROSS-CHECK (the LWS key arrived separately as a CSV covering all 150,
  // AFTER the answers were derived + independently re-derived): 146/150 AGREE. Of the 4
  // divergences, 3 were reconciled TO the official key and 1 is held against it:
  //   Q35  C -> D  adopted. Arguable: 'of course' is the more idiomatic discourse marker
  //                and 'predominantly' is a degree adverb, so the derived answer was (c).
  //                Followed the key because it is the teacher's paper; the weakest adoption.
  //   Q42  D -> C  adopted. Both QRPS and SQRP are grammatical; SQRP is main-clause-first,
  //                consistent with the setter's own style in Q44.
  //   Q44  C -> D  adopted, and the official key is genuinely BETTER — the derived QPRS is
  //                circular ("because it had to wait ... it couldn't take off") while SPQR
  //                reads cleanly. A real derivation error on our side.
  //   Q135 HELD at C against an official key of A — TEACHER-CONFIRMED 2026-08-04, so this
  //                divergence is a deliberate ruling, NOT an unreviewed override: do not
  //                "correct" it back to the official key. The official key is PROVABLY WRONG:
  //                petroleum, natural gas and coal are all fossil fuels and therefore
  //                CONVENTIONAL, while tidal energy is the non-conventional one. Corroborated
  //                by a byte-identical NDA PYQ already in the bank (60c7c564-…, same stem and
  //                same four options in the same order) which keys (c) Tidal energy. Grading
  //                against the official key would mark every correct student wrong.
  // Separately, the official key CONFIRMED the best-guess key on all four flawed rows
  // (Q21=D, Q94=C, Q131=C, Q150=D), so OMR grading is sound on them despite the defects.
  //
  // Two transcription traps this paper exposed, both caught by probe rather than by eye:
  // (1) the LAST option of every "Directions:"-headed block swallowed the NEXT block's
  // rubric (11 questions); (2) an option whose own text contains "(C)"/"(P)" reads as an
  // option marker and mis-splits the block (Q126). Both are fixed in the transcription.
  "gat-mock-w09": {
    slug: "gat-mock-w09",
    title: "NDA GAT — LWS Mock W09",
    recordsFile: "gat-mock-w09.records.json",
    outName: "Tags_NDA_GAT_Mock_W09",
    sourceFile: "NDA_GAT_MOCK_W09.docx",
    subjects: {
      English: {
        "Fill in the Blanks": ["Contextual Fill-in-Blank", "Contextual Word Selection (Phrasal Verbs and Collocations)"],
        Grammar: ["Direct and Indirect Speech", "Discourse Markers and Connectors", "Sentence Completion", "Subject-Verb Agreement"],
        "Reading Comprehension": ["Inferential Comprehension", "Literal Comprehension", "Vocabulary in Context"],
        "Sentence Rearrangement": ["Paragraph Sequencing (S1–S6)", "Sentence Part Rearrangement (PQRS)"],
        "Spotting Errors": ["Correct Sentence Identification"],
        Vocabulary: ["Confusable Word Pairs", "Synonyms", "Word Definition"],
      },
      History: {
        "Ancient India": [
          "Ancient Indian Literature and Inscriptions", "Buddhism, Jainism and Religious Architecture",
          "Harappan and Indus Valley Civilization", "Mahajanapadas, Magadha and Mauryan Empire",
          "Vedic Age, Society and Literature",
        ],
        "Medieval India": ["Medieval Travellers, Trade and Crops", "Other Medieval Kingdoms (Chola, Rajput, Ahom, Sikh)"],
        "Modern India": [
          "19th Century Social and Religious Reform", "British Administration, Acts and Legislation",
          "Freedom Movement — INC, Gandhi and Independence",
        ],
        "World History": ["20th Century — World Wars, Modernity and Global Institutions"],
      },
      Polity: {
        "Government Structure — Parliament, Judiciary and Constitutional Bodies": ["Constitutional Bodies and Offices"],
        "Indian Constitution — Making, Foundation and Amendments": ["Constitutional Amendments", "Features, Parts and Schedules of Constitution"],
        "World Polity, Democracy and International Relations": ["Democracy and Political Theory", "India's Foreign Policy — Panchsheel"],
      },
      Geography: {
        "Climatology, Atmosphere and Weather": [
          "Atmospheric Pressure and Winds", "Climate Classification and Zones",
          "Humidity, Condensation, Clouds and Precipitation", "Insolation, Temperature and Solar Geometry",
        ],
        "Earth in Space, Maps and Coordinates": ["Time Zones and International Date Line"],
        "Earth's Structure, Landforms and Geological Time": [
          "Earth's Interior, Crust and Plate Tectonics", "Earthquakes and Seismic Waves",
          "Rocks, Minerals and Geological Time", "Weathering and Denudation",
        ],
        "Indian Geography — Economy, Resources and Transport": [
          "Agriculture, Crops, Soils and Land Use", "Economic Sectors and Government Schemes",
          "Energy and Industries — Power, Petroleum, Iron and Steel", "Highways, Railways and Transport Corridors",
          "Minerals and Mining", "Ports and Maritime Infrastructure",
        ],
        "Indian Geography — Physical Features": [
          "Forests and Natural Vegetation of India", "Indian Rivers, Lakes and Water Bodies",
          "Indian States and Islands", "Mountains, Plateaus and Plains of India",
        ],
        Oceanography: ["Ocean Currents"],
      },
      Chemistry: {
        "Acids, Bases and Salts": [
          "Acid-Base Theory: Concepts, Oxides and Electrolytes", "Common Acids: Names, Formulas and Uses",
          "pH Scale and Common Substances",
        ],
        "Atomic Structure and Periodic Classification": [
          "Atomic Models: Dalton, Rutherford, Bohr", "Isotopes and Isoelectronic Species",
          "Periodic Trends, Valency and Atomicity",
        ],
        "Chemical Bonding": ["Ionic and Covalent Bonding", "Valency, Oxidation States and Molecular Formula"],
        "Industrial and Applied Chemistry": ["Cement, Glass and Building Materials", "Industrial Gases, Manufacturing and Reactions"],
        "Matter and Its States": ["Compounds, Mixtures and Solutions"],
      },
      Physics: {
        "Energy Sources": ["Energy Sources"],
        "Fluid Mechanics and Properties of Matter": ["Buoyancy, Density and Flotation"],
        Gravitation: ["Newton's Law of Gravitation", "Orbits, Kepler and Escape"],
        "Kinematics and Motion": ["Circular Motion", "Equations of Motion and Graphs", "Projectile and Vertical Motion"],
        "Laws of Motion and Forces": ["Conservation of Momentum and Collisions", "Impulse and Momentum", "Newton's Laws of Motion"],
        "Light and Optics": [
          "Lenses and Lens Formula", "Light Phenomena and Spectrum",
          "Reflection and Mirrors", "Refraction, Speed of Light and TIR",
        ],
        Sound: ["Applications — SONAR, Transducers, Instruments"],
        "Units, Measurement and Dimensions": ["Units and Dimensions"],
        "Work, Energy and Power": ["Energy and Conservation", "Work and Work Done"],
      },
      Biology: {
        "Biodiversity and Classification": ["Animal Kingdom Classification"],
        "Cell Biology": ["Cell Organelles and Functions"],
        "Human Physiology": [
          "Circulatory and Lymphatic System", "Digestive System and Enzymes",
          "Nervous System and Sense Organs", "Nutrition, Vitamins and Minerals",
        ],
        "Microbiology and Disease": ["Pathogens and Diseases"],
        "Plant Biology": ["Transpiration, Tropisms and Plant Processes"],
      },
      "Current Affairs": {
        "Awards, Honours, Books and Culture": ["UNESCO Recognitions and Cultural Heritage"],
        "Government Schemes, Policy and Governance": ["Government Events, Reports and Announcements", "Health, Education and Welfare Schemes"],
        "Science and Technology": ["Information Technology and Railway Safety", "Space Technology and Astronomy"],
      },
    },
    pyqNote: "NDA GAT practice — LWS GAT Mock W09",
    examName: "NDA",
    section: { key: "gat-mock-w09", label: "GAT Mock W09" },
    bankAdd: true,
    createPaper: false, // Excel + (optional) bank ingest; no /dashboard/papers paper
  },

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

  // DR APJ INNOVATION JUNIOR COLLEGE "NDA PHYSICS PRACTICE TEST — UNITS & DIMENSIONS" —
  // 25-q NDA Physics test (45 min, 100 marks), no printed key (answers DERIVED).
  // Born-digital DOCX with a clean text layer: every stem and all four options came
  // straight from pandoc, so NO vision pass was needed — only the unicode superscripts
  // in the dimensional formulas were re-typeset as LaTeX. Single-chapter mode; the NDA
  // Physics "Units, Measurement and Dimensions" chapter has exactly ONE DB subtopic
  // ("Units and Dimensions"), so all 25 file there.
  // Semantic dedup vs the whole 17-q chapter (both question_kinds): 22 new / 3 dup /
  // 0 flawed — every printed option block is well formed and each has exactly one
  // correct option present, which is unusually clean for an LWS paper. The 3 dups are
  // Q2 (G dimensions ≈ 5deaac34, NDA 1 2022 PYQ), Q3 (light year ≈ 6cef58cb / 005c8378)
  // and Q7 (dimensionless quantity ≈ acceba7a, NDA 1 2025 PYQ — identical stem AND
  // identical keyed answer "Strain", only the distractors are harder here). Two MAYBEs
  // adjudicated to NEW per the standing precedent: Q4 (the "which pair is NOT identical"
  // family also in 24bd737d, but only 2 of 4 options shared and the keyed option text
  // differs — force/surface-tension vs tension/surface-tension) and Q17 (SI:CGS force
  // ratio, the inverse statement of eef81c32's "1 dyne equals" over a disjoint option
  // set). Answer spread A10/B8/C4/D3 — A-heavy but that is how the paper is printed.
  //
  // OFFICIAL KEY CROSS-CHECK (the teacher's key arrived separately as a CSV covering all
  // 25, AFTER every answer had been derived): 25/25 AGREE — zero divergences, the first
  // LWS paper in this registry to come back perfect (the recent ones ran 146/150, 69/70,
  // 49/50, 45/50). That includes the four hardest items, all confirmed: Q6 (surface
  // tension in an E/V/T basis -> EV^-2T^-2), Q8 (van der Waals a -> ML^5T^-2), Q21 (a/b
  // -> L^-1/2 T^2) and Q25 (mass in an F/L/T basis -> FL^-1T^2). It also confirms the
  // A-heavy spread is the paper's own, not a transcription artifact.
  //
  // createPaper:false => BANK INGEST ONLY (user's request: "add new to nda physics"), so
  // commit-paper commits just the 22 status:"new" rows — with no paper to back the
  // printed test, the 3 dups have no consumer (the OMR Excel is built from the records
  // file, not the bank). Set createPaper:true to also create the /dashboard/papers paper,
  // which would then commit all 25 for OMR parity.
  "phys-units-dim-25": {
    slug: "phys-units-dim-25",
    title: "NDA Physics — Units & Dimensions Practice Test (25 Q)",
    recordsFile: "phys-units-dim-25.records.json",
    outName: "Tags_NDA_Physics_Units_and_Dimensions_25Q",
    sourceFile: "NDA_Physics_Units_and_Dimensions_Practice_Test.docx",
    subjectName: "Physics",
    chapterName: "Units, Measurement and Dimensions",
    subtopics: ["Units and Dimensions"],
    pyqNote: "NDA Physics practice — APJ Units & Dimensions Practice Test (25 Q)",
    examName: "NDA",
    section: { key: "units-dimensions", label: "Units & Dimensions" },
    bankAdd: true,
    createPaper: false, // bank ingest only — no /dashboard/papers paper (user's request)
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

  // LWS "Mock PK1 (Sentence Completion)" — 100-q NDA English (GAT) mock, every item the
  // same shape: a sentence stem plus four candidate completions, so the whole paper files
  // under ONE chapter (Grammar). Subtopic is assigned by the point actually TESTED, not by
  // the format: Sentence Completion 85 / Subject-Verb Agreement 9 (Q5-7, 34, 61-63, 74, 91)
  // / Correct Sentence Identification 5 (Q56-60) / Direct and Indirect Speech 1 (Q21).
  // Born-digital .docx with a clean text layer and ZERO images, so every stem and option
  // came straight from pandoc — no vision pass. NO printed key: all answers DERIVED.
  //
  // Q56-Q60 print NO STEM at all — just four candidate sentences — because they are
  // "choose the correct sentence" items. They are also all duplicates, and the matched bank
  // rows already carry the stem "Which is the correct sentence?", so that stem is reused
  // verbatim rather than invented (keeps them consistent with the existing bank copies).
  //
  // Semantic dedup vs the FULL live NDA English bank (1,432 rows, all chapters, pyq +
  // practice), run BEFORE any answer derivation: 20 DUP / 0 MAYBE / 80 NEW. The dups are
  // two CONTIGUOUS printed runs — Q36-45 and Q51-60 — i.e. those two blocks were lifted
  // wholesale from existing material while the rest of the paper is net-new. Every dup was
  // an exact option-multiset match, and the printed option ORDER was then verified to be
  // identical to the bank row's for all 20, so each bank answer letter carries over
  // unchanged (answer + solution copied from the matched row, nothing re-derived).
  //
  // 1 row HELD PRIVATE as status:"flawed": Q76 prints BOTH "till two years have passed" (a)
  // and "until two years have passed" (c), which are interchangeable here — two correct
  // options. Keyed C ("until" is the standard written form) so OMR grading still works.
  // NOTE this is NOT the same item as the dup Q51 ("I will not pay for the goods ...", bank
  // key D = "unless"): Q51's blank is CONDITIONAL, Q76's is TEMPORAL, so "unless" is right
  // there and wrong here.
  //
  // OFFICIAL KEY CROSS-CHECK (the LWS key arrived separately as a CSV covering all 100, AFTER
  // every answer had been derived): 94/100 AGREE, 98/100 after reconciliation. The printed option
  // ORDER of all six divergences was re-read from the source .docx first, so none is a
  // transcription slip. FOUR were adopted TO the official key:
  //   Q34  B -> A  and
  //   Q91  B -> A  adopted, and these are ONE disagreement applied twice — Q91 is Q34 re-skinned.
  //                Both are pseudo-clefts ("What distinguishes this theory from others ___ its
  //                empirical foundations"), where options (c)/(d) die on tense and the item reduces
  //                to a real usage split: the prescriptive rule treats the "What ..." clause as a
  //                singular subject ("is"), while the descriptive rule agrees the verb with the
  //                PLURAL predicate complement ("are"). Both are attested. The official key marks
  //                "are" CONSISTENTLY on both twins, so it is a deliberate editorial position, not a
  //                slip. Searched the bank for a third ground truth and found none — its "What ..."
  //                rows are all reading-comprehension questions, not agreement items.
  //   Q55  B -> A  adopted, and it exposed a PRINTED DEFECT: (a) "until you see the light turn green"
  //                and (b) "till you see the green light" are interchangeable, so TWO options are
  //                correct, while (c) and (d) both invert the sense. This is a dup, and the matched
  //                bank row keys B — also correct. The bank row is NOT wrong and needs no fix; the
  //                ITEM is ambiguous. Keyed A here to match the teacher's key for OMR grading.
  //   Q79  A -> B  adopted. Genuinely arguable and already flagged before the key arrived: (a) "where"
  //                takes the place noun "Ladakh" as antecedent, (b) "when" picks up the opening
  //                "Historically". Both grammatical; the temporal reading is the teacher's.
  // TWO more were first HELD against the official key and then adopted TO it on the teacher's
  // EXPLICIT instruction (2026-08-07), so the sheet now matches the official key 100/100. Both are
  // keyed AGAINST standard grammar, so both were demoted to status:"flawed" — they grade the OMR
  // but must never enter the browsable bank — and in both cases the matched bank row is CORRECT and
  // is deliberately LEFT UNTOUCHED (it stays PUBLIC with its own, different key). Do not "reconcile"
  // the bank rows to this paper:
  //   Q51  D -> C  adopted. "I will not pay for the goods if he sends me the bill again" INVERTS the
  //                sense: receiving the bill is the condition for PAYING, not for refusing. Bank row
  //                613bd0e0-da66-45c7-860a-34b39eed2f69 keys D and is unchanged. ((a) "till" and (b)
  //                "until" also read acceptably; only the official C is indefensible on any reading.)
  //   Q58  A -> C  adopted. "Whom" is objective case and cannot be the SUBJECT of "has", so the
  //                official (c) "Whom amongst you has the answer?" is ungrammatical; only (a) "Who
  //                among you has the answer?" is well formed. Bank row
  //                1a5d37b5-0028-4c5c-b06f-bc4ce84f0ad1 keys A and is unchanged.
  // The official key CONFIRMED the best-guess key on the flawed Q76 (C), so OMR grading is sound there.
  // NET: 3 rows held PRIVATE as status:"flawed" (Q51, Q58, Q76); the 18 remaining dups and the 79
  // new rows are unaffected.
  //
  // Other flags carried in reviewNote rather than resolved: Q10 (option D is well-formed but
  // "kept staring" contradicts the stem's "avoided looking at her"); Q27 (past perfect "had
  // yielded" is the tested point, but bare "yielded" is not strictly ungrammatical); Q46 (more than
  // one option supplies a subject capable of "struggling", so it turns on coherence); Q99 ("Were it
  // not for" is present-form, but "his timely intervention" fixes the event in past time, so the
  // mixed "would have collapsed" is keyed over the strictly-present "would collapse").
  //
  // Structural property worth knowing before flipping PUBLIC: the paper RE-SKINS ~11 of its
  // own earlier items in the Q81-100 block — Q13~Q85, Q14~Q86, Q15~Q87, Q17~Q88, Q18~Q89,
  // Q19~Q90, Q21~Q92, Q22~Q93, Q23~Q94, Q25~Q95, Q34~Q91 — same construction, swapped nouns.
  // They are genuinely distinct questions (different stems, different options, different
  // content_hash) so they are kept "new" per the standing MAYBE precedent, but a reviewer may
  // not want both halves of each pair in the browsable bank.
  "eng-mock-pk1": {
    slug: "eng-mock-pk1",
    title: "NDA English — Mock PK1 (Sentence Completion)",
    recordsFile: "eng-mock-pk1.records.json",
    outName: "Tags_NDA_English_Mock_PK1_Sentence_Completion",
    sourceFile: "Mock PK1 ( Sen Completion) LWS.docx",
    subjectName: "English",
    chapterName: "Grammar",
    subtopics: [
      "Sentence Completion",
      "Subject-Verb Agreement",
      "Correct Sentence Identification",
      "Direct and Indirect Speech",
    ],
    pyqNote: "NDA English (GAT) practice — LWS Mock PK1 (Sentence Completion)",
    examName: "NDA",
    section: { key: "grammar", label: "Grammar" },
    bankAdd: true,
    createPaper: false, // Excel is the requested deliverable; no /dashboard/papers paper
  },

  // LWS "NDA GAT MOCK W07" — a 150-q GAT mock: Q1-50 English, Q51-150 Chemistry (the
  // paper carries NO Physics/Biology/History/Geography/Polity/CA section, unlike W09).
  // Source `NDA GAT MOCK W07 (2).pdf` is BORN-DIGITAL with a clean text layer, so the
  // whole paper was extracted from `page.get_text()` — no vision pass. 137 of 150
  // stem+option blocks parsed mechanically; the 13 that did not are hand-written (the
  // 10 SPOTTING ERRORS items, whose options are inline `(a)/ ... (b)/` segments rather
  // than an option block, plus the two Assertion-Reason items Q56/Q73 and the
  // statement-list Q139, where an embedded "A." / "1." reads as an option marker).
  //
  // **A PRINTED ANSWER KEY EXISTS** (`NDA GAT MOCK W07 - Answer Key (1).pdf`, all 150),
  // so unlike most LWS papers the answers are GIVEN, not derived. Every key was still
  // re-derived independently before use, and that caught **THREE PROVABLY WRONG KEYS**,
  // all corrected here (the W09 Q135 precedent — grading against a wrong key marks every
  // correct student wrong):
  //   Q138 key (c) Nitrogen -> **(b) Carbon dioxide**. Only \(\text{CO}_2\) reacts with
  //        water (giving carbonic acid); \(\text{H}_2\), \(\text{N}_2\), \(\text{O}_2\)
  //        give neutral solutions. THREE independent confirmations: my derivation, a
  //        blind agent that never saw the key, and a SIBLING BANK ROW
  //        (b6576b8d-d37f-425b-b09a-a5e610770845, "Which of the following is an acidic
  //        oxide?") which already keys \(\text{CO}_2\).
  //   Q139 key (b) 2,3,4 only -> **(a) 1,2,3 only**. Stainless steel is Fe+Cr+Ni and
  //        contains NO copper, so statement 4 is false, while statement 1 (brass = Cu+Zn)
  //        is true — the printed key both admits a false statement and drops a true one.
  //   Q140 key (a) Copper oxide -> **(d) Sodium oxide**. CuO and \(\text{Fe}_2\text{O}_3\)
  //        are water-insoluble and \(\text{Al}_2\text{O}_3\) is amphoteric but
  //        water-insoluble; only \(\text{Na}_2\text{O}\) dissolves, giving NaOH.
  // The official key is RETAINED on four further items that are defective or debatable
  // but not provably wrong — a judgement call is not a licence to override the teacher:
  // Q90 ("isomerism" is under-specified; read literally all four groups show isomerism,
  // so the item works only as FUNCTIONAL isomerism), Q148 (potassium genuinely floats by
  // density, so (c) is defensible; the key's (b) calcium rests on the NCERT "hydrogen
  // bubbles make it float" framing), Q56 (the A-R explanation clause is historically
  // contestable) and Q20 (English sequencing — the strictly best order QSPR is not
  // offered, and two independent derivations preferred (d) QSRP over the key's (c)).
  // Each carries a reviewNote.
  //
  // Q54 (Celsius-to-Fahrenheit) and Q130 (histone proteins) sit in the Chemistry half of
  // the printed paper but are NOT chemistry, so they file to Physics > Temperature and
  // Thermometry and Biology > Protein Structure respectively — the bank taxonomy is the
  // authority on filing, not the paper's own section order.
  "gat-mock-w07": {
    slug: "gat-mock-w07",
    title: "NDA GAT — LWS Mock W07",
    recordsFile: "gat-mock-w07.records.json",
    outName: "Tags_NDA_GAT_Mock_W07",
    sourceFile: "NDA_GAT_MOCK_W07.pdf",
    subjects: {
      English: {
        Vocabulary: ["Antonyms", "Confusable Word Pairs", "Synonyms", "Word Definition"],
        Grammar: [
          "Active and Passive Voice", "Articles, Determiners and Quantifiers",
          "Correct Sentence Identification", "Direct and Indirect Speech",
          "Discourse Markers and Connectors", "Parts of Speech", "Preposition Usage",
          "Sentence Completion", "Subject-Verb Agreement",
        ],
        "Reading Comprehension": ["Inferential Comprehension", "Literal Comprehension", "Vocabulary in Context"],
        "Sentence Rearrangement": ["Paragraph Sequencing (S1–S6)", "Sentence Part Rearrangement (PQRS)"],
        "Spotting Errors": [
          "Articles, Determiners and Pronouns", "Correct Sentence Identification",
          "Mixed Error Detection", "No Error (Correct Sentence)", "Sentence Improvement",
          "Subject-Verb Agreement", "Tense and Verb Form",
          "Word Choice, Prepositions and Punctuation",
        ],
      },
      Chemistry: {
        "Acids, Bases and Salts": [
          "Acid-Base Theory: Concepts, Oxides and Electrolytes", "Common Acids: Names, Formulas and Uses",
          "Salts and Common Compounds", "Water of Crystallization", "pH Scale and Common Substances",
        ],
        "Atomic Structure and Periodic Classification": [
          "Atomic Models: Dalton, Rutherford, Bohr", "Atomic Number, Mass Number and Subatomic Particles",
          "Electron Configuration and Valence Shells", "Isotopes and Isoelectronic Species",
          "Periodic Trends, Valency and Atomicity",
        ],
        "Carbon and Its Compounds": [
          "Allotropes of Carbon", "Catenation, Tetra-valency and Isomerism",
          "Common Carbon Compounds and Pigments", "Functional Groups and Common Organic Compounds",
          "Hydrocarbons and Organic Classification", "Soaps, Detergents and Hydrogenation of Oils",
        ],
        "Chemical Bonding": [
          "Bond Counting and Molecular Structure", "Ionic and Covalent Bonding",
          "Valency, Oxidation States and Molecular Formula",
        ],
        "Chemical Reactions": [
          "Endothermic and Exothermic Reactions", "Physical vs Chemical Changes",
          "Redox: Oxidation, Reduction and Reducing Agents",
          "Specific Reactions: Precipitation, Electrolysis and Daily Life",
          "Thermal and Photochemical Decomposition",
          "Types of Reactions: Combination, Decomposition, Displacement",
        ],
        "Chemistry in Everyday Life": ["Common Chemicals and Their Uses", "Medicines and Health Chemistry"],
        "Hydrogen and Water": [
          "Hardness and Purity of Water", "Properties and Anomalous Behaviour of Water",
          "Properties of Hydrogen",
        ],
        "Industrial and Applied Chemistry": [
          "Cement, Glass and Building Materials", "Common Industrial Substances and Alloys",
          "Fertilizers", "Industrial Gases, Manufacturing and Reactions", "Paints and Coatings",
        ],
        "Matter and Its States": [
          "Colloids and Suspensions", "Compounds, Mixtures and Solutions",
          "Physical vs Chemical Changes", "Separation Techniques",
          "States of Matter, Phase Changes and Diffusion",
        ],
        "Metals and Non-Metals": [
          "Alloys and Their Composition", "Corrosion and Its Prevention",
          "Extraction of Metals and Ores", "Reactivity Series and Reactions with Water",
        ],
        "Mole Concept and Stoichiometry": [
          "Mole Concept, Avogadro's Law and Molar Calculations",
          "Stoichiometry and Laws of Chemical Combination",
        ],
        "Practical Chemistry": ["Practical Applications: Health, Food and Lab Methods"],
      },
      // Q54 + Q130 only — printed in the Chemistry half but filed where they belong.
      Physics: { "Heat and Thermodynamics": ["Temperature and Thermometry"] },
      Biology: { Biochemistry: ["Protein Structure"] },
    },
    pyqNote: "NDA GAT practice — LWS GAT Mock W07",
    examName: "NDA",
    section: { key: "gat-mock-w07", label: "GAT Mock W07" },
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
