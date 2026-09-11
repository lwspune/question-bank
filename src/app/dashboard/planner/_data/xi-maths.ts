/**
 * Std XI Mathematics — session plan (MH State Board, 1 session = 1 hour).
 *
 * ── WHAT IS AUTHORED HERE AND WHAT IS NOT ────────────────────────────────────
 * Authored: the CUT POINTS — which book sections share an hour, in what order,
 * and where an NDA or CBSE gap needs a class of its own. Nothing else.
 *
 * Derived live from `syllabus_concepts` at render time: every subtopic and
 * concept TITLE, exam weightage, practice-question counts. A session stores
 * only `section_no` refs, so a spine correction reaches this plan without an
 * edit here, and this file can never rot into a stale second copy of the book.
 *
 * ── IDS ARE FROZEN ───────────────────────────────────────────────────────────
 * `id` is allocated once and NEVER reissued — teaching notes will key on it.
 * To insert a class between s03 and s04, give it the next unused number for
 * that chapter and place it where it belongs in the array. The list will then
 * be out of id order, which is correct: position drives the displayed number.
 *
 * ── ORDER INSIDE A CHAPTER IS A TEACHING DECISION ────────────────────────────
 * Chapters run in book order. Sessions WITHIN a chapter sometimes do not, and
 * the two places they diverge are deliberate — do not "restore" either to
 * printed order:
 *
 *   Ch.4 teaches MATRICES (§4.4-§4.7) before DETERMINANTS (§4.1-§4.3). A
 *   determinant is a property OF a matrix, and the printed order asks a student
 *   to evaluate one before meeting the object it belongs to.
 *
 *   Ch.8 opens with mean, median and mode — which the book never teaches
 *   anywhere, while §8.2 uses x-bar from its first formula onward.
 *
 * ── WHERE THE EXTRAS COME FROM ───────────────────────────────────────────────
 * Every `extra` is a ruling already in the syllabus map, not a fresh opinion.
 * Placement follows the rule measured across all 48 NDA rulings, which held
 * with zero exceptions: `partial` always carries a `covered_by` anchor, so it
 * extends the chapter it points at; `not` never carries one, so it stands
 * alone. `reason` quotes the ruling's own finding.
 *
 * ── PACING ───────────────────────────────────────────────────────────────────
 * Roughly 1.3-1.6 book leaves per hour, and
 * weighted by exam PYQ, so §3.1 Compound Angles (200 PYQ behind it) gets two
 * hours while §11.1 Sequence shares one. That rate is a MATHS rate taken from
 * two chapters; it is not evidence about Physics or Chemistry.
 */
import type { SessionPlan } from "@/lib/planner/types";

export const XI_MATHS_PLAN: SessionPlan = {
  key: "xi-maths",
  label: "Std XI Mathematics",
  subject: "Mathematics",
  cls: 11,
  source: "MH State Board",
  bankExam: "Maharashtra State Board Class 11",
  chapters: [
    // ── Ch.1 Angle and its Measurement ──────────────────────────────────────
    // 3 hours over 4 leaves, with §1.1 Directed Angles spread across two
    // (degree measure, then radian measure and conversion).
    {
      chapterNo: 1,
      sessions: [
        {
          id: "c01-s01",
          subtopics: ["1.1"],
          concepts: ["1.1.1", "1.1.2"],
          note: "Directed angles, coterminal angles, then degree measure.",
        },
        {
          id: "c01-s02",
          subtopics: ["1.1"],
          concepts: ["1.1.3"],
          note: "Radian measure and degree-radian conversion both ways.",
        },
        {
          id: "c01-s03",
          subtopics: ["1.2"],
          concepts: [],
          note: "Arc length and sector area — l = rθ and A = ½r²θ, with θ in radians.",
        },
      ],
    },

    // ── Ch.2 Trigonometry - I ───────────────────────────────────────────────
    {
      chapterNo: 2,
      sessions: [
        {
          id: "c02-s01",
          subtopics: ["2.1"],
          concepts: ["2.1.1", "2.1.2"],
          beats: ["Basics of trigonometry — recap of ratios from Class 10"],
          note: "The recap beat has no book section — it opens the chapter so the circle definition lands on something familiar.",
        },
        {
          id: "c02-s02",
          subtopics: ["2.1"],
          concepts: ["2.1.4", "2.1.3b"],
          note: "Specific angles 0/30/45/60/90/120/180/225, then negative angles.",
        },
        {
          id: "c02-s03",
          subtopics: ["2.2"],
          concepts: ["2.2.1"],
          note: "The three fundamental identities, then domain and range.",
        },
        { id: "c02-s04", subtopics: ["2.9"], concepts: [], note: "Graphs of sin, cos, tan." },
        {
          id: "c02-s05",
          subtopics: ["2.1", "2.2"],
          concepts: ["2.1.3", "2.2.2"],
          note: "Range and periodicity. Both feed the NDA max-min work in Ch.3.",
        },
        {
          id: "c02-s06",
          subtopics: ["2.2"],
          concepts: ["2.2.4"],
          note: "Polar coordinates — also sets up the Argand plane in Ch.10.",
        },
      ],
    },

    // ── Ch.3 Trigonometry - II ──────────────────────────────────────────────
    // The heaviest trigonometry chapter by exam weight: 853 PYQ across three
    // banks, 277 of them NDA. Compound and allied angles carry it, so they get
    // two hours each.
    {
      chapterNo: 3,
      sessions: [
        { id: "c03-s01", subtopics: ["3.1"], concepts: [], note: "sin(A±B) and cos(A±B) — derivation and first problems." },
        { id: "c03-s02", subtopics: ["3.1"], concepts: [], note: "tan(A±B), cot(A±B) and conditional identities. 200 PYQ sit on §3.1." },
        { id: "c03-s03", subtopics: ["3.2"], concepts: [], note: "Allied angles — the quadrant rule, then drill." },
        { id: "c03-s04", subtopics: ["3.3"], concepts: ["3.3.1"], note: "Double angle, including the t-formulae." },
        { id: "c03-s05", subtopics: ["3.3"], concepts: ["3.3.2"], note: "Triple angle." },
        { id: "c03-s06", subtopics: ["3.4"], concepts: ["3.4.1"], note: "Sum or difference into product." },
        { id: "c03-s07", subtopics: ["3.4"], concepts: ["3.4.2"], note: "Product into sum or difference." },
        { id: "c03-s08", subtopics: ["3.5"], concepts: [], note: "Trigonometric functions of the angles of a triangle." },
        {
          id: "c03-s09",
          subtopics: [],
          concepts: [],
          beats: [
            "a·sinθ + b·cosθ = r·sin(θ + α) — the reduction",
            "Maximum and minimum values ±√(a²+b²)",
            "Range of expressions built from the reduction",
          ],
          extra: {
            source: "NDA",
            title: "Maximum and minimum of trigonometric expressions",
            reason:
              "The range of sinθ and cosθ is taught at §2.1.3 and the compound-angle tools exist, but the a·sinθ+b·cosθ = r·sin(θ+α) reduction that gives ±√(a²+b²) is never shown. Anchors at §2.1.3 and §3.1, so it belongs here, once compound angles are in hand.",
            pyq: 22,
            anchored: true,
          },
        },
        {
          id: "c03-s10",
          subtopics: [],
          concepts: [],
          beats: [
            "Angle of elevation and angle of depression",
            "Towers, shadows and the two-observer setup",
            "Leaning structures and multi-step problems",
          ],
          extra: {
            source: "NDA",
            title: "Heights and distances",
            reason:
              "'Angle of elevation', 'depression' and shadow/tower work are ZERO across both Std XI and XII — the sole 'tower' hit is a Conics arch problem. Needs only the ratios from Ch.2, so it is taught here rather than deferred.",
            pyq: 16,
            anchored: false,
          },
        },
      ],
    },

    // ── Ch.4 Determinants and Matrices ──────────────────────────────────────
    // 264 bank questions and the largest Std XI chapter. §4.2 Properties (163
    // PYQ) and the three applications each earn their own hour.
    //
    // TAUGHT MATRICES-FIRST, against the printed order — see the file header.
    // The ids still read s08..s12 then s01..s07 because an id is frozen on
    // allocation; position is what numbers the sessions on screen. Do not
    // renumber them to "tidy" this: that is the whole mechanism keeping a
    // teaching note attached to its class across a reorder like this one.
    {
      chapterNo: 4,
      sessions: [
        {
          id: "c04-s08",
          subtopics: ["4.4"],
          concepts: ["4.4.1"],
          note: "Matrices introduced; types of matrices. Taught before determinants — a determinant is a property OF a matrix, so the object comes first.",
        },
        { id: "c04-s09", subtopics: ["4.5"], concepts: [], note: "Algebra of matrices — addition, scalar multiple, product." },
        { id: "c04-s10", subtopics: ["4.6"], concepts: [], note: "Properties of matrix multiplication, including non-commutativity." },
        { id: "c04-s11", subtopics: ["4.7"], concepts: [], note: "Transpose and its properties; symmetric and skew-symmetric." },
        {
          id: "c04-s12",
          subtopics: [],
          concepts: [],
          beats: [
            "Orthogonal matrices — AAᵀ = I",
            "Idempotent, involutory and nilpotent matrices",
            "Rotation matrices",
          ],
          extra: {
            source: "NDA",
            title: "Special matrices beyond the book's list",
            reason:
              "§4.4.1 teaches diagonal, scalar, identity, triangular, symmetric, skew-symmetric and singular. MISSING from both years: orthogonal, idempotent and rotation matrices. Anchors at §4.4.1, so it extends this chapter.",
            pyq: 22,
            anchored: true,
          },
        },
        {
          id: "c04-s01",
          subtopics: ["4.1"],
          concepts: ["4.1.1", "4.1.2"],
          note: "Determinant of order 2 and 3, expansion by a row — now a property of a matrix already in hand.",
        },
        { id: "c04-s02", subtopics: ["4.1"], concepts: ["4.1.3"], note: "Minors and cofactors." },
        { id: "c04-s03", subtopics: ["4.2"], concepts: [], note: "Properties of determinants — statement and proof." },
        { id: "c04-s04", subtopics: ["4.2"], concepts: [], note: "Evaluating by property rather than expansion. 163 PYQ sit here." },
        { id: "c04-s05", subtopics: ["4.3"], concepts: ["4.3.1"], note: "Cramer's rule." },
        { id: "c04-s06", subtopics: ["4.3"], concepts: ["4.3.2"], note: "Consistency of three equations in two variables." },
        { id: "c04-s07", subtopics: ["4.3"], concepts: ["4.3.3"], note: "Area of a triangle and collinearity." },
      ],
    },

    // ── Ch.5 Straight Line ──────────────────────────────────────────────────
    // The five standard forms are one hour together, not five: they are the
    // same object rewritten, and drilling them apart wastes four hours.
    {
      chapterNo: 5,
      sessions: [
        { id: "c05-s01", subtopics: ["5.1"], concepts: ["5.1.1"], note: "Locus — what it means, then finding its equation." },
        { id: "c05-s02", subtopics: ["5.1"], concepts: ["5.1.1"], note: "Harder locus problems. 106 PYQ sit on §5.1.1." },
        { id: "c05-s03", subtopics: ["5.1"], concepts: ["5.1.2"], note: "Shift of origin." },
        { id: "c05-s04", subtopics: ["5.2"], concepts: ["5.2.2"], note: "Inclination and slope of a line." },
        { id: "c05-s05", subtopics: ["5.2"], concepts: ["5.2.3", "5.2.4"], note: "Parallel and perpendicular lines; angle between two lines." },
        { id: "c05-s06", subtopics: ["5.3"], concepts: ["5.3.1", "5.3.2", "5.3.3"], note: "Point-slope, slope-intercept and two-point forms together — one object, three rewrites." },
        { id: "c05-s07", subtopics: ["5.3"], concepts: ["5.3.4", "5.3.5"], note: "Double-intercept and normal forms." },
        { id: "c05-s08", subtopics: ["5.4"], concepts: ["5.4.1", "5.4.2"], note: "General form; distance of the origin and of a point from a line." },
        { id: "c05-s09", subtopics: ["5.4"], concepts: ["5.4.3"], note: "Distance between two parallel lines." },
        { id: "c05-s10", subtopics: ["5.4"], concepts: ["5.4.4"], note: "Family of lines through the intersection of two lines." },
      ],
    },

    // ── Ch.6 Circle ─────────────────────────────────────────────────────────
    // Only 6 leaves but 768 PYQ — §6.3.2 Condition of tangency alone carries
    // 196. Weight, not leaf count, sets the pace here.
    {
      chapterNo: 6,
      sessions: [
        { id: "c06-s01", subtopics: ["6.1"], concepts: [], note: "Standard, centre-radius and diameter forms." },
        { id: "c06-s02", subtopics: ["6.2"], concepts: [], note: "General equation; centre and radius by inspection." },
        { id: "c06-s03", subtopics: ["6.2"], concepts: [], note: "Circle through three points; conditions on the general form." },
        { id: "c06-s04", subtopics: ["6.3"], concepts: ["6.3.1"], note: "Parametric form, then the tangent." },
        { id: "c06-s05", subtopics: ["6.3"], concepts: ["6.3.2"], note: "Condition of tangency — 196 PYQ, the densest section in the chapter." },
        { id: "c06-s06", subtopics: ["6.3"], concepts: ["6.3.3"], note: "Tangents from an external point; length of the tangent." },
        { id: "c06-s07", subtopics: ["6.3"], concepts: ["6.3.4"], note: "Director circle." },
        {
          id: "c06-s08",
          subtopics: [],
          concepts: [],
          beats: [
            "Inscribed-angle and angle-in-a-semicircle facts",
            "Chord midpoints and the perpendicular from the centre",
            "Intersecting chords and the tangent-secant relation",
          ],
          extra: {
            source: "NDA",
            title: "Circle geometry the coordinate chapter assumes",
            reason:
              "Tangent, condition of tangency and tangents from a point are taught (§6.3.1-§6.3.4), but these questions also use inscribed-angle facts, chord midpoints and segment relations that the coordinate treatment never states. Anchors at §6.2 and §6.3.1-2.",
            pyq: 7,
            anchored: true,
          },
        },
      ],
    },

    // ── Ch.7 Conic Sections ─────────────────────────────────────────────────
    // 28 leaves, the largest chapter in the book. The three conics are taught
    // in the same shape — standard form, terms, tangent, condition, tangents
    // from a point, director circle — so later conics move faster than the
    // parabola once the pattern is established.
    {
      chapterNo: 7,
      sessions: [
        { id: "c07-s01", subtopics: [], concepts: ["7.1.1", "7.1.2", "7.1.3"], note: "Double cone, the sections it cuts, and the focus-directrix definition." },
        { id: "c07-s02", subtopics: [], concepts: ["7.1.4"], note: "Focus, directrix, axis, vertex, latus rectum, eccentricity." },
        { id: "c07-s03", subtopics: [], concepts: ["7.1.5", "7.1.6"], note: "Parabola y² = 4ax and its tracing." },
        { id: "c07-s04", subtopics: [], concepts: ["7.1.7", "7.1.8"], note: "Standard results; the other three orientations." },
        { id: "c07-s05", subtopics: [], concepts: ["7.1.9", "7.1.10"], note: "Parametric form; general form with a shifted vertex." },
        { id: "c07-s06", subtopics: [], concepts: ["7.1.11", "7.1.12"], note: "Tangent to a parabola and the condition of tangency." },
        { id: "c07-s07", subtopics: [], concepts: ["7.1.13"], note: "Tangents from an external point." },
        { id: "c07-s08", subtopics: ["7.2"], concepts: ["7.2.1", "7.2.2"], note: "Ellipse — standard equation and standard results." },
        { id: "c07-s09", subtopics: ["7.2"], concepts: ["7.2.3"], note: "Special cases; the ellipse with a shifted centre." },
        { id: "c07-s10", subtopics: ["7.2"], concepts: ["7.2.4", "7.2.5"], note: "Tangent and condition for tangency." },
        { id: "c07-s11", subtopics: ["7.2"], concepts: ["7.2.6"], note: "Tangents from a point to the ellipse." },
        { id: "c07-s12", subtopics: ["7.2"], concepts: ["7.2.7", "7.2.8"], note: "Auxiliary and director circles as the locus of perpendicular tangents." },
        { id: "c07-s13", subtopics: ["7.3"], concepts: ["7.3.1", "7.3.2"], note: "Hyperbola — standard equation and its terms." },
        { id: "c07-s14", subtopics: ["7.3"], concepts: ["7.3.3", "7.3.4"], note: "Standard results; tangent to a hyperbola." },
        { id: "c07-s15", subtopics: ["7.3"], concepts: ["7.3.5", "7.3.6", "7.3.7", "7.3.8"], note: "Condition for tangency, tangents from a point, auxiliary and director circles — the ellipse pattern repeats, so this moves fast." },
        { id: "c07-s16", subtopics: ["7.3"], concepts: ["7.3.9"], note: "Asymptotes; the rectangular hyperbola." },
      ],
    },

    // ── Ch.8 Measures of Dispersion ─────────────────────────────────────────
    // THE chapter where the exam gap dominates the book. Five book leaves, and
    // four separate NDA/CBSE rulings against it — including the single largest
    // gap in the whole subject, central tendency at 75 PYQ, which this book
    // presupposes throughout §8.2 and never teaches.
    {
      chapterNo: 8,
      sessions: [
        {
          id: "c08-s07",
          subtopics: [],
          concepts: [],
          beats: [
            "Mean of raw, discrete and grouped data",
            "Median and the median class",
            "Mode and the modal class",
          ],
          extra: {
            source: "NDA",
            title: "Measures of central tendency — mean, median, mode",
            reason:
              "Taught in NEITHER Std XI nor Std XII. The dispersion chapter presupposes x̄ throughout §8.2 and never teaches it. Class 9/10 material that the board assumes and the exam asks — the largest single gap in Std XI Maths.",
            pyq: 75,
            anchored: false,
          },
          note: "Taught FIRST, before the book's own chapter: §8.2 opens with a formula that uses x̄.",
        },
        { id: "c08-s01", subtopics: ["8.1"], concepts: ["8.1.1"], note: "What dispersion measures; range and coefficient of range." },
        { id: "c08-s02", subtopics: ["8.2"], concepts: ["8.2.1", "8.2.2"], note: "Variance and standard deviation for raw and discrete data." },
        { id: "c08-s03", subtopics: ["8.2"], concepts: ["8.2.2"], note: "Standard deviation for grouped data; the shortcut formula." },
        { id: "c08-s04", subtopics: ["8.2"], concepts: ["8.2.3"], note: "Change of origin and scale." },
        { id: "c08-s05", subtopics: ["8.3"], concepts: [], note: "Standard deviation of combined data." },
        { id: "c08-s06", subtopics: ["8.3"], concepts: ["8.3.1"], note: "Coefficient of variation and comparing two series." },
        {
          id: "c08-s08",
          subtopics: [],
          concepts: [],
          beats: [
            "Mean deviation about the mean and about the median",
            "Coefficient of mean deviation",
          ],
          extra: {
            source: "CBSE",
            title: "Mean deviation",
            reason:
              "'Mean deviation' is ZERO across the entire State Board corpus — §8.1 goes from range straight to variance. NCERT §13.4 teaches it, and NDA's Dispersion subtopic names it as its missing half, so this one hour closes BOTH gaps. No PYQ figure is claimed: the NDA ruling's 44 PYQ covers the whole Dispersion subtopic, most of which the board does teach.",
            anchored: true,
          },
        },
        {
          id: "c08-s09",
          subtopics: [],
          concepts: [],
          beats: [
            "Grouped frequency distributions and cumulative frequency",
            "Histogram, frequency polygon and ogive",
            "Reading a pie chart",
          ],
          extra: {
            source: "NDA",
            title: "Frequency distributions and graphical representation",
            reason:
              "'Histogram', 'ogive' and 'frequency polygon' are ZERO in both years, while the exam asks students to read values off them.",
            pyq: 14,
            anchored: false,
          },
        },
        {
          id: "c08-s10",
          subtopics: [],
          concepts: [],
          beats: [
            "Scatter diagrams and the meaning of correlation",
            "Karl Pearson's coefficient of correlation",
            "The two lines of regression",
          ],
          extra: {
            source: "NDA",
            title: "Correlation and regression",
            reason:
              "'Correlation' and 'regression' are ZERO in both years — an NDA statistics topic that lives outside the Science-stream syllabus entirely.",
            pyq: 27,
            anchored: false,
          },
        },
      ],
    },

    // ── Ch.9 Probability ────────────────────────────────────────────────────
    {
      chapterNo: 9,
      sessions: [
        { id: "c09-s01", subtopics: [], concepts: ["9.1.1"], note: "Random experiment, sample space, event." },
        { id: "c09-s02", subtopics: [], concepts: ["9.1.2", "9.1.3"], note: "Classical probability and equally likely outcomes." },
        { id: "c09-s03", subtopics: [], concepts: ["9.1.4"], note: "Probability of an event — the counting-heavy problems. Uses Ch.12, so schedule after it if you reorder." },
        { id: "c09-s04", subtopics: [], concepts: ["9.1.5"], note: "Elementary properties; complementary events." },
        { id: "c09-s05", subtopics: [], concepts: ["9.2.1"], note: "Addition theorem for two events." },
        { id: "c09-s06", subtopics: [], concepts: ["9.3.1", "9.3.2"], note: "Conditional probability." },
        { id: "c09-s07", subtopics: [], concepts: ["9.3.3"], note: "Multiplication theorem." },
        { id: "c09-s08", subtopics: [], concepts: ["9.3.4"], note: "Independent events — and why independent is not mutually exclusive." },
        { id: "c09-s09", subtopics: ["9.4"], concepts: [], note: "Bayes' theorem." },
        { id: "c09-s10", subtopics: ["9.5"], concepts: [], note: "Odds in favour and against." },
        {
          id: "c09-s11",
          subtopics: [],
          concepts: [],
          beats: [
            "Greatest and least values of P(A∩B) and P(A∪B)",
            "P(E∩F) ≥ P(E) + P(F) − 1",
            "P(A∪B) ≤ P(A) + P(B)",
          ],
          extra: {
            source: "NDA",
            title: "Bounds on probability",
            reason:
              "Elementary properties and the addition theorem are taught, and these bounds are one-line corollaries of them — but the book never states them and the exam asks for them directly. Anchors at §9.1.5 and §9.2.1.",
            pyq: 12,
            anchored: true,
          },
        },
      ],
    },

    // ── Ch.10 Complex Numbers ───────────────────────────────────────────────
    // 18 leaves, but §10.2's eight arithmetic sub-sections are one hour
    // together — they are the four operations, not eight topics. The three
    // quadratic-theory extras hang off §10.4.1, which is where the book itself
    // solves a quadratic.
    {
      chapterNo: 10,
      sessions: [
        { id: "c10-s01", subtopics: ["10.1"], concepts: ["10.2.1"], note: "i, the complex number, equality." },
        { id: "c10-s02", subtopics: ["10.2"], concepts: ["10.2.3", "10.2.4", "10.2.5", "10.2.6", "10.2.8"], note: "The four operations — one hour, not five: they are ordinary algebra with i² = −1." },
        { id: "c10-s03", subtopics: ["10.2"], concepts: ["10.2.2", "10.2.7"], note: "Conjugate and its properties; powers of i." },
        { id: "c10-s04", subtopics: ["10.3"], concepts: [], note: "Square root of a complex number." },
        { id: "c10-s05", subtopics: ["10.4"], concepts: ["10.4.1"], note: "Fundamental theorem of algebra; solving a quadratic over ℂ." },
        { id: "c10-s06", subtopics: ["10.5"], concepts: ["10.5.1"], note: "Argand diagram; modulus and its properties." },
        { id: "c10-s07", subtopics: ["10.5"], concepts: ["10.5.2", "10.5.3"], note: "Argument, and the quadrant rule for it." },
        { id: "c10-s08", subtopics: ["10.5"], concepts: ["10.5.4", "10.5.5"], note: "Polar and exponential forms." },
        { id: "c10-s09", subtopics: ["10.6"], concepts: [], note: "De Moivre's theorem." },
        { id: "c10-s10", subtopics: ["10.7"], concepts: [], note: "Cube roots of unity and ω-identities." },
        { id: "c10-s11", subtopics: ["10.8"], concepts: [], note: "Sets of points in the complex plane." },
        {
          id: "c10-s12",
          subtopics: [],
          concepts: [],
          beats: [
            "α + β = −b/a and αβ = c/a",
            "Building a quadratic from its roots",
            "Symmetric functions of the roots",
          ],
          extra: {
            source: "NDA",
            title: "Vieta's relations and root-coefficient identities",
            reason:
              "Never taught in either year — the 'sum of the roots' hits in the book are incidental chord-intersection steps in Circle and Conics, not quadratic theory. Placed here because §10.4.1 is where the book itself solves a quadratic.",
            pyq: 26,
            anchored: false,
          },
        },
        {
          id: "c10-s13",
          subtopics: [],
          concepts: [],
          beats: [
            "The discriminant and the nature of the roots",
            "Sign of a quadratic expression",
            "Conditions on a parameter for given root behaviour",
          ],
          extra: {
            source: "NDA",
            title: "Nature of roots and boundary conditions",
            reason:
              "No quadratic theory in Std XI or XII: 'nature of roots' is ZERO in both books, and discriminant classification and parameter conditions are untaught.",
            pyq: 21,
            anchored: false,
          },
        },
        {
          id: "c10-s14",
          subtopics: [],
          concepts: [],
          beats: [
            "Quadratics in a substituted variable",
            "Logarithmic and exponential quadratics",
            "Quadratics constructed from a given condition",
          ],
          extra: {
            source: "NDA",
            title: "Special quadratics — parametric, logarithmic, constructed",
            reason:
              "These dress Class 10 quadratic theory in log, trig and parametric wrappers; with no quadratic-equation theory anywhere in the Std XI/XII books, the wrapper is all the student has seen.",
            pyq: 16,
            anchored: false,
          },
        },
      ],
    },

    // ── Ch.11 Sequences and Series ──────────────────────────────────────────
    {
      chapterNo: 11,
      sessions: [
        { id: "c11-s01", subtopics: ["11.1"], concepts: [], note: "Sequence and series; notation." },
        { id: "c11-s02", subtopics: ["11.2"], concepts: [], note: "A.P. — nth term and sum." },
        { id: "c11-s03", subtopics: ["11.2"], concepts: [], note: "A.P. problems: terms in A.P., mid-term tricks." },
        { id: "c11-s04", subtopics: ["11.3"], concepts: ["11.3.1", "11.3.2"], note: "G.P. — nth term and sum of n terms." },
        { id: "c11-s05", subtopics: ["11.4"], concepts: ["11.4.1"], note: "Sum to infinity; recurring decimals as rationals." },
        { id: "c11-s06", subtopics: ["11.5"], concepts: [], note: "H.P." },
        { id: "c11-s07", subtopics: ["11.6"], concepts: ["11.6.1", "11.6.2", "11.6.3"], note: "A.M., G.M., H.M. and the A.M. ≥ G.M. ≥ H.M. chain." },
        { id: "c11-s08", subtopics: ["11.7"], concepts: ["11.7.1"], note: "Arithmetico-geometric progression." },
        { id: "c11-s09", subtopics: ["11.8"], concepts: [], note: "Power series; Σn, Σn², Σn³." },
      ],
    },

    // ── Ch.12 Permutations and Combination ──────────────────────────────────
    {
      chapterNo: 12,
      sessions: [
        { id: "c12-s01", subtopics: ["12.1", "12.2"], concepts: ["12.2.1", "12.2.2"], note: "Addition and multiplication principles." },
        { id: "c12-s02", subtopics: ["12.3", "12.4"], concepts: [], note: "Invariance principle; factorial notation." },
        { id: "c12-s03", subtopics: ["12.5"], concepts: ["12.5.1"], note: "Permutations of distinct objects." },
        { id: "c12-s04", subtopics: ["12.5"], concepts: ["12.5.2"], note: "Permutations with repetition allowed." },
        { id: "c12-s05", subtopics: ["12.5"], concepts: ["12.5.3"], note: "Permutations when some objects are identical." },
        { id: "c12-s06", subtopics: ["12.5"], concepts: ["12.5.4"], note: "Circular permutations." },
        { id: "c12-s07", subtopics: ["12.6"], concepts: [], note: "Combinations; choosing versus arranging." },
        { id: "c12-s08", subtopics: ["12.6"], concepts: ["12.6.1"], note: "Properties of combinations; mixed selection problems." },
      ],
    },

    // ── Ch.13 Methods of Induction and Binomial Theorem ─────────────────────
    // Note for scheduling: the bank ships this chapter as "Binomial Theorem"
    // (§13.2-§13.5 only) because mathematical induction has no chapter in any
    // exam taxonomy. Induction is still taught here — it is in the book, and
    // the NDA divisibility extra depends on it.
    {
      chapterNo: 13,
      bankChapterName: "Binomial Theorem",
      sessions: [
        { id: "c13-s01", subtopics: ["13.1"], concepts: [], note: "Principle of mathematical induction — the three steps." },
        { id: "c13-s02", subtopics: ["13.1"], concepts: [], note: "Induction applied to sums, divisibility and inequalities." },
        { id: "c13-s03", subtopics: ["13.2"], concepts: [], note: "Binomial theorem for a positive integral index; Pascal's triangle." },
        { id: "c13-s04", subtopics: ["13.3"], concepts: [], note: "General term; finding a particular term and the term independent of x." },
        { id: "c13-s05", subtopics: ["13.3"], concepts: [], note: "Middle term; greatest coefficient. 131 PYQ sit on §13.3." },
        { id: "c13-s06", subtopics: ["13.4"], concepts: [], note: "Binomial theorem for a negative or fractional index." },
        { id: "c13-s07", subtopics: ["13.5"], concepts: [], note: "Binomial coefficients and identities among them." },
        {
          id: "c13-s08",
          subtopics: [],
          concepts: [],
          beats: [
            "Remainder of aⁿ on division by m, via expansion",
            "Divisibility proved by expansion rather than induction",
          ],
          extra: {
            source: "NDA",
            title: "Remainders and divisibility by binomial expansion",
            reason:
              "The book proves divisibility statements by INDUCTION at §13.1, never by expansion, and the binomial sections never revisit them. Anchors at §13.1.",
            pyq: 3,
            anchored: true,
          },
        },
        {
          id: "c13-s09",
          subtopics: [],
          concepts: [],
          beats: [
            "The conjugate-pair trick for (a + √b)ⁿ",
            "Integer part and fractional part of a binomial surd",
          ],
          extra: {
            source: "NDA",
            title: "Integer and fractional parts of binomial expressions",
            reason:
              "Expansion and the general term are taught (§13.2-§13.3), but the conjugate-pair floor/fractional-part technique for (a+√b)ⁿ is never shown.",
            pyq: 8,
            anchored: false,
          },
        },
      ],
    },

    // ── Ch.14 Sets and Relations ────────────────────────────────────────────
    // The CBSE inequalities gap is parked at the END of this chapter because
    // §14.1.6 Intervals is where interval notation is introduced, and interval
    // notation is how an inequality's solution set is written.
    {
      chapterNo: 14,
      sessions: [
        { id: "c14-s01", subtopics: ["14.1"], concepts: ["14.1.1", "14.1.2"], note: "Set; roster and set-builder forms." },
        { id: "c14-s02", subtopics: ["14.1"], concepts: ["14.1.4"], note: "Types of sets; subsets and the power set." },
        { id: "c14-s03", subtopics: ["14.1"], concepts: ["14.1.5"], note: "Union, intersection, difference, complement; Venn diagrams." },
        { id: "c14-s04", subtopics: ["14.1"], concepts: ["14.1.3"], note: "Number of elements — the two- and three-set inclusion-exclusion formulae." },
        { id: "c14-s05", subtopics: ["14.1"], concepts: ["14.1.6"], note: "Intervals as sets of real numbers." },
        { id: "c14-s06", subtopics: ["14.2"], concepts: ["14.2.1", "14.2.2", "14.2.3"], note: "Ordered pairs; Cartesian product, and a set with itself." },
        { id: "c14-s07", subtopics: ["14.2"], concepts: ["14.2.4", "14.2.5"], note: "Relation, domain, codomain, range; binary relation on a set." },
        { id: "c14-s08", subtopics: ["14.2"], concepts: ["14.2.6", "14.2.7"], note: "Identity relation; reflexive, symmetric, transitive, equivalence." },
        {
          id: "c14-s09",
          subtopics: [],
          concepts: [],
          beats: [
            "Rules for manipulating an inequality (and why multiplying by a negative flips it)",
            "Solving a linear inequality in one variable",
            "Representing the solution on a number line and as an interval",
          ],
          extra: {
            source: "CBSE",
            title: "Linear inequalities in one variable",
            reason:
              "The State Board has NO Linear Inequalities chapter — its only inequality teaching is §XII:7.1, two-variable half-planes inside Linear Programming. NCERT §5.3 solves one-variable inequalities and puts the solution on a number line. Placed after §14.1.6 because interval notation is how the answer is written.",
            anchored: true,
          },
        },
      ],
    },

    // ── Ch.15 Functions ─────────────────────────────────────────────────────
    {
      chapterNo: 15,
      sessions: [
        { id: "c15-s01", subtopics: ["15.1"], concepts: ["15.1.2", "15.1.4"], note: "Function as a rule; representation; evaluating f(x)." },
        { id: "c15-s02", subtopics: ["15.1"], concepts: ["15.1.1"], note: "One-one, onto, bijective." },
        { id: "c15-s03", subtopics: ["15.1"], concepts: ["15.1.3"], note: "Graph of a function; the vertical-line test." },
        { id: "c15-s04", subtopics: ["15.1"], concepts: ["15.1.5"], note: "Basic functions I — constant, identity, polynomial, rational, modulus." },
        { id: "c15-s05", subtopics: ["15.1"], concepts: ["15.1.5"], note: "Basic functions II — signum, greatest integer, exponential, logarithmic. 190 PYQ sit on §15.1.5." },
        { id: "c15-s06", subtopics: ["15.2"], concepts: ["15.2.1"], note: "Composition of functions." },
        { id: "c15-s07", subtopics: ["15.2"], concepts: ["15.2.2"], note: "Inverse functions; when an inverse exists." },
        { id: "c15-s08", subtopics: ["15.2"], concepts: ["15.2.3"], note: "Piecewise-defined functions." },
        {
          id: "c15-s09",
          subtopics: [],
          concepts: [],
          beats: [
            "f(x+y) = f(x)+f(y) ⇒ f(x) = kx",
            "f(x+y) = f(x)·f(y) ⇒ f(x) = aᵏˣ",
            "f(xy) = f(x)+f(y) ⇒ f(x) = k·log x",
            "Solving by substituting particular values",
          ],
          extra: {
            source: "NDA",
            title: "Functional equations",
            reason:
              "An unnumbered Note in the Functions chapter TABULATES the standard solution forms, but the chapter never teaches how to solve one. Anchors at §15.1.5.",
            pyq: 18,
            anchored: true,
          },
        },
      ],
    },

    // ── Ch.16 Limits ────────────────────────────────────────────────────────
    // §16.1's seven sub-sections are two hours, not seven: they define one
    // idea from both sides and then state its algebra.
    {
      chapterNo: 16,
      sessions: [
        { id: "c16-s01", subtopics: [], concepts: ["16.1.1", "16.1.2"], note: "The limit of a function — the idea, informally and then precisely." },
        { id: "c16-s02", subtopics: [], concepts: ["16.1.3", "16.1.4", "16.1.5", "16.1.6"], note: "One-sided limits and the existence condition — one idea from two sides." },
        { id: "c16-s03", subtopics: [], concepts: ["16.1.7"], note: "Algebra of limits." },
        { id: "c16-s04", subtopics: ["16.2"], concepts: [], note: "Method of factorization." },
        { id: "c16-s05", subtopics: ["16.3"], concepts: [], note: "Method of rationalization." },
        { id: "c16-s06", subtopics: ["16.4"], concepts: ["16.4.2"], note: "Trigonometric limits and the sinθ/θ theorem." },
        { id: "c16-s07", subtopics: ["16.5"], concepts: [], note: "Substitution method." },
        { id: "c16-s08", subtopics: ["16.6"], concepts: [], note: "Exponential and logarithmic limits; the e-form." },
        { id: "c16-s09", subtopics: ["16.7"], concepts: ["16.7.1", "16.7.2"], note: "Limits at infinity and infinite limits." },
      ],
    },

    // ── Ch.17 Continuity ────────────────────────────────────────────────────
    // The five discontinuity sub-sections (17.1.6-17.1.9) are one hour: a
    // taxonomy is learnt as a contrast set, not one type at a time.
    {
      chapterNo: 17,
      sessions: [
        { id: "c17-s01", subtopics: ["17.1"], concepts: ["17.1.1", "17.1.2"], note: "Continuity at a point — the three-condition definition." },
        { id: "c17-s02", subtopics: ["17.1"], concepts: ["17.1.3"], note: "Continuity from the right and from the left." },
        { id: "c17-s03", subtopics: ["17.1"], concepts: ["17.1.4"], note: "Standard continuous functions." },
        { id: "c17-s04", subtopics: ["17.1"], concepts: ["17.1.5"], note: "Algebra of continuous functions; continuity of a composite." },
        { id: "c17-s05", subtopics: ["17.1"], concepts: ["17.1.6", "17.1.7", "17.1.8", "17.1.9"], note: "The discontinuity taxonomy — jump, removable and infinite together, as a contrast set." },
        { id: "c17-s06", subtopics: ["17.1"], concepts: ["17.1.10"], note: "Continuity over an interval; finding a constant that makes f continuous." },
        { id: "c17-s07", subtopics: ["17.1"], concepts: ["17.1.11"], note: "Intermediate value theorem." },
      ],
    },

    // ── Ch.18 Differentiation ───────────────────────────────────────────────
    // The four rule theorems (18.2.1-18.2.4) are one hour — they are proved
    // the same way and used together from the next hour onward.
    {
      chapterNo: 18,
      sessions: [
        { id: "c18-s01", subtopics: [], concepts: ["18.1.1", "18.1.2"], note: "Derivative as a limit; differentiability at a point." },
        { id: "c18-s02", subtopics: [], concepts: ["18.1.3"], note: "Derivative by first principle — algebraic functions." },
        { id: "c18-s03", subtopics: [], concepts: ["18.1.3"], note: "First principle — trigonometric, exponential and logarithmic." },
        { id: "c18-s04", subtopics: [], concepts: ["18.1.4"], note: "Derivatives of standard functions — the table to memorise." },
        { id: "c18-s05", subtopics: [], concepts: ["18.1.5"], note: "Differentiability implies continuity, and why the converse fails." },
        { id: "c18-s06", subtopics: ["18.2"], concepts: ["18.2.1", "18.2.2", "18.2.3", "18.2.4"], note: "Sum, difference, product and quotient rules — proved together." },
        { id: "c18-s07", subtopics: ["18.2"], concepts: ["18.2.5"], note: "Derivatives of algebraic functions." },
        { id: "c18-s08", subtopics: ["18.2"], concepts: ["18.2.6", "18.2.7"], note: "Derivatives of trigonometric, logarithmic and exponential functions." },
      ],
    },

    // ── NDA-only, no State Board home ───────────────────────────────────────
    // Deliberately NOT parked on a nearby chapter. Number bases are not part of
    // Sets and Relations, and filing them there would tell a teacher the board
    // covers this somewhere. It does not.
    {
      chapterNo: null,
      title: "NDA extras — no State Board chapter",
      sessions: [
        {
          id: "xtr-s01",
          subtopics: [],
          concepts: [],
          beats: ["Place value in base 2", "Binary to decimal", "Decimal to binary"],
          extra: {
            source: "NDA",
            title: "Binary representation and conversion",
            reason:
              "No base-conversion content in either year — every 'binary' hit in the books is 'binary relation' in Ch.14. NDA-specific, from computer fundamentals.",
            pyq: 6,
            anchored: false,
          },
        },
        {
          id: "xtr-s02",
          subtopics: [],
          concepts: [],
          beats: ["Binary addition and subtraction", "Binary multiplication and division", "Identities in base 2"],
          extra: {
            source: "NDA",
            title: "Binary arithmetic",
            reason:
              "No base-2 arithmetic anywhere in Std XI or XII. Number-base arithmetic is not board material.",
            pyq: 7,
            anchored: false,
          },
        },
      ],
    },
  ],
};
